
  document.addEventListener('DOMContentLoaded', function() {
    let open_modal = document.querySelectorAll('.modal');
    let show_modal = M.Modal.init(open_modal);

    let invite = document.querySelectorAll('.invite_people');
    let show_invite = M.Modal.init(invite);

    let drop = document.querySelectorAll('.role');
    let show_dropdown = M.Dropdown.init(drop);

    let users = document.querySelectorAll('.users');
    let checkbox =  M.Dropdown.init(users, {closeOnClick:false});

    let emails = document.querySelectorAll('.chips');
    let add_chips = M.Chips.init(emails);
  });