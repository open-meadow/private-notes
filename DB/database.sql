-- 1. 카테고리 테이블
CREATE TABLE Category (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
);

-- 2. 레시피 테이블
CREATE TABLE Recipe (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category_id INTEGER,
    ingredients TEXT,
    instructions TEXT,
    image_url TEXT,
    FOREIGN KEY (category_id) REFERENCES Category(id)
);

SELECT * FROM Recipe;

-- 1. 카테고리 데이터 초기화 (이미 있다면 무시하고 추가)
INSERT OR IGNORE INTO Category (id, name) VALUES (1, 'Food');
INSERT OR IGNORE INTO Category (id, name) VALUES (2, 'Drink');
INSERT OR IGNORE INTO Category (id, name) VALUES (3, 'Dessert');
INSERT OR IGNORE INTO Category (id, name) VALUES (4, 'Item');

-- 2. 레시피 데이터 (MOCK_DATA 기반)
-- 이미 넣었던 데이터와 겹치지 않게 id는 자동으로 생성되도록 했습니다.

INSERT INTO Recipe (title, category_id, ingredients, instructions) VALUES 
('Classic Beef Pho', 1, 'Rice noodles, beef brisket, star anise, cinnamon, ginger, onion, fish sauce', 'A traditional Vietnamese noodle soup with rich broth, slow-cooked for 6 hours.'),
('Brown Sugar Bubble Tea', 2, 'Black tea, fresh milk, brown sugar syrup, tapioca pearls, ice', 'Creamy milk tea with chewy tapioca pearls and caramelized brown sugar.'),
('Caramel Flan', 3, 'Eggs, whole milk, sugar, vanilla extract, caramel sauce', 'Silky smooth custard with a golden caramel top. Chill overnight for best results.'),
('Garlic Butter Pasta', 1, 'Spaghetti, butter, garlic, parmesan, parsley, black pepper, olive oil', 'Quick and easy pasta tossed in rich garlic butter sauce. Ready in 20 minutes.'),
('Fresh Lemonade', 2, 'Lemon, water, sugar syrup, mint leaves, ice cubes', 'Refreshing homemade lemonade. Add mint for an extra kick.'),
('How to Fix a Leaky Faucet', 4, 'Wrench, replacement washer, plumber tape, screwdriver', 'Step 1: Turn off water supply. Step 2: Remove handle. Step 3: Replace washer. Step 4: Reassemble.'),
('Chocolate Lava Cake', 3, 'Dark chocolate, butter, eggs, sugar, flour, cocoa powder, vanilla', 'Warm chocolate cake with a gooey molten center. Serve immediately with vanilla ice cream.'),
('Morning Productivity Routine', 4, 'Journal, water bottle, workout clothes, phone (no social media)', 'Wake at 6AM. Drink water. 20 min workout. Journal 3 goals. No phone for first hour.'),
('Avocado Toast', 1, 'Sourdough bread, ripe avocado, lemon juice, chili flakes, sea salt, poached egg', 'Smash avocado with lemon and salt. Spread on toasted sourdough. Top with a poached egg.'),
('Matcha Latte', 2, 'Matcha powder, oat milk, honey, hot water, ice (for iced version)', 'Whisk matcha with hot water until frothy. Pour over steamed oat milk and sweeten with honey.'),
('Basic Guitar Chords', 4, 'Guitar, chord chart, tuner, picks', 'Start with G, C, D, Em. Practice switching between chords slowly. 15 mins daily is enough.'),
('Banana Pancakes', 3, 'Ripe banana, eggs, oat flour, baking powder, cinnamon, maple syrup, butter', 'Mash banana with eggs. Mix in flour and baking powder. Cook on medium heat 2 min per side.'),
('Caesar Salad', 1, 'Romaine lettuce, parmesan, croutons, caesar dressing, black pepper, lemon', 'Toss lettuce with dressing. Top with croutons and shaved parmesan. Serve chilled.');

-- 3. 잘 들어갔는지 최종 확인!
SELECT * FROM Recipe;

-- ==========================================
-- 3. Example Query to Add a New Recipe
-- (Use this template for adding user-input data)
-- ==========================================

INSERT INTO Recipe (title, category_id, ingredients, instructions, image_url)
VALUES (
    'New Recipe Title', 
    1, -- Category ID (1:Food, 2:Drink, 3:Dessert, 4:Item)
    'List of ingredients separated by commas', 
    'Step-by-step cooking instructions', 
    'https://example.com/image.jpg' -- Optional image URL
);

-- Check if the new data is added correctly
SELECT * FROM Recipe ORDER BY id DESC LIMIT 1;