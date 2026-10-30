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
      [
        ['Order date', new Date(order.created_at).toLocaleString()],
        ['Account / UID', order.uid || '—'],
        ['Server ID', order.server_id || '—'],
        ['Quantity', String(order.quantity)],
        ['Total', 'Rs' + order.total],
        ['Payment', order.payment_method.toUpperCase()]
      ].forEach(function (entry) {
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
