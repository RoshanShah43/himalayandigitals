document.addEventListener('DOMContentLoaded', async function () {
  var container = document.getElementById('ordersContainer');
  var client;
  var user;
  try {
    client = window.getSupabaseClient();
    var auth = await client.auth.getUser();
    if (auth.error) throw auth.error;
    user = auth.data.user;
  } catch (error) {
    container.textContent = error.message || 'Could not connect to your account.';
    return;
  }

  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  var profile = await client.from('profiles').select('username').eq('id', user.id).single();
  if (profile.error) {
    container.textContent = 'Could not load your profile: ' + profile.error.message;
    return;
  }
  document.getElementById('profileUsername').textContent = profile.data.username || user.email;

  var result = await client.from('orders').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
  if (result.error) {
    container.textContent = 'Could not load your orders: ' + result.error.message;
    return;
  }
  if (!result.data.length) {
    container.textContent = 'You have not placed any orders yet.';
  } else {
    container.classList.remove('empty-state');
    result.data.forEach(function (order) {
      var card = document.createElement('article');
      card.className = 'order-card';
      var heading = document.createElement('div');
      heading.className = 'order-header';
      var title = document.createElement('span');
      title.className = 'order-game';
      title.textContent = order.game_title + ' — ' + order.pack_label;
      var status = document.createElement('span');
      status.className = 'order-status' + (order.status === 'Completed' ? ' completed' : '');
      status.textContent = order.status;
      heading.appendChild(title);
      heading.appendChild(status);

      var details = document.createElement('div');
      details.className = 'order-details';
      var detailEntries = [
        ['Order date', new Date(order.created_at).toLocaleString()],
        [order.whatsapp_number ? 'WhatsApp number' : (order.target_url ? 'Target link' : 'Account / UID'), order.whatsapp_number || order.target_url || order.uid || '—'],
        ['Server ID', order.server_id || '—'],
        ['Quantity', String(order.quantity)],
        ['Total', 'Rs' + order.total],
        ['Payment', order.payment_method.toUpperCase()],
        ['Payment code', order.payment_code || 'Not available']
      ];
      if (order.coupon_code) {
        detailEntries.splice(4, 0, ['Coupon', order.coupon_code + ' · -Rs' + order.discount_amount]);
      }
      if (Number(order.refill_days) > 0) {
        detailEntries.push(['Refill window', order.refill_days + ' days']);
        if (order.refill_status) {
          detailEntries.push(['Refill request', order.refill_status]);
        }
      }
      detailEntries.forEach(function (entry) {
        var item = document.createElement('div');
        item.className = 'detail-item';
        var label = document.createElement('div');
        label.className = 'detail-label';
        label.textContent = entry[0];
        var value = document.createElement('div');
        value.className = 'detail-value';
        value.textContent = entry[1];
        item.appendChild(label);
        item.appendChild(value);
        details.appendChild(item);
      });
      card.appendChild(heading);
      card.appendChild(details);
      var refillDays = Number(order.refill_days) || 0;
      var refillDeadline = new Date(order.created_at).getTime() + refillDays * 86400000;
      if (refillDays > 0 && order.status === 'Completed' && !order.refill_status &&
          Number.isFinite(refillDeadline) && Date.now() <= refillDeadline) {
        var refillButton = document.createElement('button');
        refillButton.className = 'profile-action';
        refillButton.type = 'button';
        refillButton.textContent = 'Request refill';
        refillButton.addEventListener('click', async function () {
          refillButton.disabled = true;
          refillButton.textContent = 'Sending request…';
          var request = await client.rpc('request_order_refill', { p_order_id: order.id });
          if (request.error) {
            refillButton.disabled = false;
            refillButton.textContent = 'Request refill';
            container.setAttribute('role', 'status');
            refillButton.insertAdjacentText('afterend', ' ' + request.error.message);
            return;
          }
          order.refill_status = 'Requested';
          refillButton.textContent = 'Refill requested';
          refillButton.disabled = true;
          var requestDetail = document.createElement('div');
          requestDetail.className = 'detail-item';
          requestDetail.innerHTML = '<div class="detail-label">Refill request</div><div class="detail-value"></div>';
          requestDetail.querySelector('.detail-value').textContent = 'Requested';
          details.appendChild(requestDetail);
        });
        card.appendChild(refillButton);
      }
      container.appendChild(card);
    });
  }

  document.getElementById('logoutBtn').addEventListener('click', async function () {
    var signOut = await client.auth.signOut();
    if (signOut.error) {
      container.textContent = 'Could not sign out: ' + signOut.error.message;
      return;
    }
    window.location.href = 'index.html';
  });
});
