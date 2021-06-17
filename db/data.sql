INSERT INTO Users (username, first_name, last_name, email, password, role) VALUES
  ('danden6', 'Данііл', 'Денисюк', 'denysiuk@gmail.com', 'qwerty', 'admin'),
  ('rustman', 'Ростислав', 'Марич', 'marych@gmail.com', '12345', 'user');

INSERT INTO MenuItems (name, category, weight, description, price) VALUES
  ('Рол каліфорнія 1', 'rolls', '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Рол каліфорнія 2', 'rolls', '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Рол каліфорнія 3', 'rolls', '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Рол каліфорнія 4', 'rolls', '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Рол каліфорнія 5', 'rolls',  '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Сет каліфорнія 1', 'sets',  '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Сет каліфорнія 2', 'sets',  '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Сет каліфорнія 3', 'sets',  '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Сет каліфорнія 4', 'sets',  '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Сет каліфорнія 5', 'sets',  '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Суші каліфорнія 1', 'sushi',  '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Суші каліфорнія 2', 'sushi',  '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Суші каліфорнія 3', 'sushi',  '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Суші каліфорнія 4', 'sushi',  '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Cуп каліфорнія 1', 'soups',  '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Cуп каліфорнія 2', 'soups',  '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500'),
  ('Cуп каліфорнія 3', 'soups',  '925г','ролл Филадельфия с копченым
  лососем, ролл Филадельфия в
  масаго, ролл Джинджер, рол
  крабик 924 г', '500');

INSERT INTO MenuItems (name, category, volume, energy, price) VALUES
  ('Напій Швепс 1', 'drinks', '0.5л', '500ккал', '100'),
  ('Напій Швепс 2', 'drinks', '0.5л', '500ккал', '100');

INSERT INTO Item_Image (item_id, img, img_order) VALUES
  (1, '/public/media/roll-1.png', 1),
  (2, '/public/media/roll-2.png', 1),
  (3, '/public/media/roll-3.png', 1),
  (4, '/public/media/roll-4.png', 1),
  (5, '/public/media/roll-1.png', 1),
  (6, '/public/media/set-1.png', 1),
  (7, '/public/media/set-2.png', 1),
  (8, '/public/media/set-3.png', 1),
  (9, '/public/media/set-4.png', 1),
  (10, '/public/media/set-1.png', 1),
  (11, '/public/media/sushi-1.png', 1),
  (12, '/public/media/sushi-2.png', 1),
  (13, '/public/media/sushi-1.png', 1),
  (14, '/public/media/sushi-2.png', 1),
  (15, '/public/media/soup-2.png', 1),
  (16, '/public/media/soup-1.png', 1),
  (17, '/public/media/soup-2.png', 1),
  (18, '/public/media/drink-1.png', 1),
  (19, '/public/media/drink-2.png', 1);

INSERT INTO Orders (user_id, order_price, customer_name, customer_phone) VALUES
  (2, 500, 'Марич', '21421421421'),
  (2, 900, 'Марич', '21421421421');

INSERT INTO Order_Item (order_id, item_id) VALUES
  (1, 1),
  (1, 2),
  (2, 3),
  (2, 4),
  (2, 5);

INSERT INTO User_Item (user_id, item_id) VALUES
  (2, 1),
  (2, 2),
  (2, 3),
  (2, 4),
  (2, 5);