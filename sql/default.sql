BEGIN;

-- ==========================================
-- ETAPE 1 : INSERTION DES JOUEURS (50 Noms FFXIV)
-- ==========================================
INSERT INTO player (nom)
VALUES ('Meteor Survivor'),
       ('Yshtola Rhul'),
       ('Thancred Waters'),
       ('Urianger Augurelt'),
       ('Alphinaud Leveilleur'),
       ('Alisaie Leveilleur'),
       ('Estinien Wyrmblood'),
       ('Graha Tia'),
       ('Tataru Taru'),
       ('Raubahn Aldynn'),
       ('Pipin Tarupin'),
       ('Aymeric de Borel'),
       ('Haurchefant Greystone'),
       ('Yugiri Mistwalker'),
       ('Hien Rijin'),
       ('Gosetsu Everstrike'),
       ('Krile Mayer'),
       ('Lyse Hext'),
       ('Papalymo Totolymo'),
       ('Minfilia Warde'),
       ('Moenbryda Wilfsunn'),
       ('Gaius Baelsar'),
       ('Nero tol Scaeva'),
       ('Cid Garlond'),
       ('Biggs'),
       ('Wedge'),
       ('Hildibrand Manderville'),
       ('Godbert Manderville'),
       ('Julyan Manderville'),
       ('Nashu Mhakaracca'),
       ('Fray Myste'),
       ('Sidurgu Orl'),
       ('Rielle'),
       ('Curious Gorge'),
       ('Broken Mountain'),
       ('Jenlyns'),
       ('Sultana Nanamo'),
       ('Merlwyb Bloefhiswyn'),
       ('Kan-E-Senna'),
       ('Raya-O-Senna'),
       ('A-Ruhn-Senna'),
       ('Eschiva'),
       ('Alka Zolka'),
       ('Surito Carito'),
       ('Leveva'),
       ('Jandelaine'),
       ('Gegeruju'),
       ('Momodi Modi'),
       ('Baderon Tenfingers'),
       ('Miounne');

-- ==========================================
-- ETAPE 2 : INSERTION DES CLASSES (10 Jobs FFXIV)
-- ==========================================
INSERT INTO classe (role, nom)
VALUES ('Tank', 'Paladin'),
       ('Tank', 'Guerrier'),
       ('Tank', 'Chevalier Noir'),
       ('Healer', 'Mage Blanc'),
       ('Healer', 'Erudit'),
       ('Healer', 'Astromancien'),
       ('Melee DPS', 'Chevalier Dragon'),
       ('Melee DPS', 'Ninja'),
       ('Ranged DPS', 'Barde'),
       ('Magical DPS', 'Mage Noir');

-- ==========================================
-- ETAPE 3 : ATTRIBUTION DES CLASSES (Au moins 1 par joueur)
-- ==========================================

-- Les Héritiers de la Septième Aube (Multi-jobs pour certains)
INSERT INTO player_classe (player_id, classe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Meteor Survivor'), (SELECT id FROM classe WHERE nom = 'Paladin')),
       ((SELECT id FROM player WHERE nom = 'Meteor Survivor'), (SELECT id FROM classe WHERE nom = 'Guerrier')),
       ((SELECT id FROM player WHERE nom = 'Yshtola Rhul'), (SELECT id FROM classe WHERE nom = 'Mage Noir')),
       ((SELECT id FROM player WHERE nom = 'Thancred Waters'), (SELECT id FROM classe WHERE nom = 'Paladin')),
       ((SELECT id FROM player WHERE nom = 'Thancred Waters'), (SELECT id FROM classe WHERE nom = 'Ninja')),
       ((SELECT id FROM player WHERE nom = 'Urianger Augurelt'), (SELECT id FROM classe WHERE nom = 'Astromancien')),
       ((SELECT id FROM player WHERE nom = 'Alphinaud Leveilleur'), (SELECT id FROM classe WHERE nom = 'Erudit')),
       ((SELECT id FROM player WHERE nom = 'Alisaie Leveilleur'), (SELECT id FROM classe WHERE nom = 'Mage Noir')),
       ((SELECT id FROM player WHERE nom = 'Estinien Wyrmblood'),
        (SELECT id FROM classe WHERE nom = 'Chevalier Dragon')),
       ((SELECT id FROM player WHERE nom = 'Graha Tia'), (SELECT id FROM classe WHERE nom = 'Paladin')),
       ((SELECT id FROM player WHERE nom = 'Graha Tia'), (SELECT id FROM classe WHERE nom = 'Mage Blanc')),
       ((SELECT id FROM player WHERE nom = 'Tataru Taru'), (SELECT id FROM classe WHERE nom = 'Erudit')),

-- Dirigeants et alliés (Tanks & Healers focus)
       ((SELECT id FROM player WHERE nom = 'Raubahn Aldynn'), (SELECT id FROM classe WHERE nom = 'Paladin')),
       ((SELECT id FROM player WHERE nom = 'Pipin Tarupin'), (SELECT id FROM classe WHERE nom = 'Paladin')),
       ((SELECT id FROM player WHERE nom = 'Aymeric de Borel'), (SELECT id FROM classe WHERE nom = 'Paladin')),
       ((SELECT id FROM player WHERE nom = 'Haurchefant Greystone'), (SELECT id FROM classe WHERE nom = 'Paladin')),
       ((SELECT id FROM player WHERE nom = 'Kan-E-Senna'), (SELECT id FROM classe WHERE nom = 'Mage Blanc')),
       ((SELECT id FROM player WHERE nom = 'Raya-O-Senna'), (SELECT id FROM classe WHERE nom = 'Mage Blanc')),
       ((SELECT id FROM player WHERE nom = 'A-Ruhn-Senna'), (SELECT id FROM classe WHERE nom = 'Mage Blanc')),
       ((SELECT id FROM player WHERE nom = 'Merlwyb Bloefhiswyn'), (SELECT id FROM classe WHERE nom = 'Barde')),
       ((SELECT id FROM player WHERE nom = 'Sultana Nanamo'), (SELECT id FROM classe WHERE nom = 'Mage Blanc')),

-- Guerriers et Ninjas d'Orient
       ((SELECT id FROM player WHERE nom = 'Yugiri Mistwalker'), (SELECT id FROM classe WHERE nom = 'Ninja')),
       ((SELECT id FROM player WHERE nom = 'Hien Rijin'), (SELECT id FROM classe WHERE nom = 'Chevalier Dragon')),
       ((SELECT id FROM player WHERE nom = 'Gosetsu Everstrike'), (SELECT id FROM classe WHERE nom = 'Guerrier')),
       ((SELECT id FROM player WHERE nom = 'Lyse Hext'), (SELECT id FROM classe WHERE nom = 'Guerrier')),

-- Scientifiques et ingénieurs (Mages & Bards)
       ((SELECT id FROM player WHERE nom = 'Krile Mayer'), (SELECT id FROM classe WHERE nom = 'Mage Blanc')),
       ((SELECT id FROM player WHERE nom = 'Cid Garlond'), (SELECT id FROM classe WHERE nom = 'Barde')),
       ((SELECT id FROM player WHERE nom = 'Nero tol Scaeva'), (SELECT id FROM classe WHERE nom = 'Guerrier')),
       ((SELECT id FROM player WHERE nom = 'Biggs'), (SELECT id FROM classe WHERE nom = 'Guerrier')),
       ((SELECT id FROM player WHERE nom = 'Wedge'), (SELECT id FROM classe WHERE nom = 'Barde')),

-- Personnages de quêtes de classe et divers
       ((SELECT id FROM player WHERE nom = 'Fray Myste'), (SELECT id FROM classe WHERE nom = 'Chevalier Noir')),
       ((SELECT id FROM player WHERE nom = 'Sidurgu Orl'), (SELECT id FROM classe WHERE nom = 'Chevalier Noir')),
       ((SELECT id FROM player WHERE nom = 'Rielle'), (SELECT id FROM classe WHERE nom = 'Mage Blanc')),
       ((SELECT id FROM player WHERE nom = 'Curious Gorge'), (SELECT id FROM classe WHERE nom = 'Guerrier')),
       ((SELECT id FROM player WHERE nom = 'Broken Mountain'), (SELECT id FROM classe WHERE nom = 'Guerrier')),
       ((SELECT id FROM player WHERE nom = 'Jenlyns'), (SELECT id FROM classe WHERE nom = 'Paladin')),
       ((SELECT id FROM player WHERE nom = 'Hildibrand Manderville'), (SELECT id FROM classe WHERE nom = 'Paladin')),
       ((SELECT id FROM player WHERE nom = 'Godbert Manderville'),
        (SELECT id FROM classe WHERE nom = 'Chevalier Dragon')),
       ((SELECT id FROM player WHERE nom = 'Julyan Manderville'), (SELECT id FROM classe WHERE nom = 'Guerrier')),
       ((SELECT id FROM player WHERE nom = 'Nashu Mhakaracca'), (SELECT id FROM classe WHERE nom = 'Barde')),
       ((SELECT id FROM player WHERE nom = 'Eschiva'), (SELECT id FROM classe WHERE nom = 'Mage Blanc')),
       ((SELECT id FROM player WHERE nom = 'Alka Zolka'), (SELECT id FROM classe WHERE nom = 'Erudit')),
       ((SELECT id FROM player WHERE nom = 'Surito Carito'), (SELECT id FROM classe WHERE nom = 'Erudit')),
       ((SELECT id FROM player WHERE nom = 'Leveva'), (SELECT id FROM classe WHERE nom = 'Astromancien')),
       ((SELECT id FROM player WHERE nom = 'Jandelaine'), (SELECT id FROM classe WHERE nom = 'Barde')),
       ((SELECT id FROM player WHERE nom = 'Gegeruju'), (SELECT id FROM classe WHERE nom = 'Barde')),
       ((SELECT id FROM player WHERE nom = 'Momodi Modi'), (SELECT id FROM classe WHERE nom = 'Chevalier Dragon')),
       ((SELECT id FROM player WHERE nom = 'Baderon Tenfingers'), (SELECT id FROM classe WHERE nom = 'Guerrier')),
       ((SELECT id FROM player WHERE nom = 'Miounne'), (SELECT id FROM classe WHERE nom = 'Mage Blanc')),
       ((SELECT id FROM player WHERE nom = 'Moenbryda Wilfsunn'), (SELECT id FROM classe WHERE nom = 'Guerrier'));

-- ==========================================
-- ETAPE 4 : INSERTION DES 20 GROUPES
-- ==========================================
INSERT INTO groupe (nom)
VALUES ('Static UCOB (Fatal)'),
       ('Static UWU (Fatal)'),
       ('Static TEA (Fatal)'),
       ('Static DSR (Fatal)'),
       ('Static TOP (Fatal)'),
       ('Progression M1S-M4S'),
       ('Farm Pandaemonium'),
       ('Roster Blind Arcadion'),
       ('CL Les Chocobos Fringants'),
       ('CL Gardiens d Eorzea'),
       ('Alliance 24 - Euphrosyne'),
       ('Speedkill Asphodelos'),
       ('Farm Montures Extremes'),
       ('Roster Lalafell'),
       ('Chasseurs de Rangs S'),
       ('Static Nuit Blanche'),
       ('Mercenaires (Gils runs)'),
       ('Roster Matinal'),
       ('Static Midcore Soirée'),
       ('Roster Détente et Wipes');

-- ==========================================
-- ETAPE 5 : ATTRIBUTION DES GROUPES (5 a 20 joueurs par groupe)
-- ==========================================

-- ---------------------------------------------------------
-- GROUPE 1 : Static UCOB (8 Joueurs - Les Héritiers)
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Meteor Survivor'),
        (SELECT id FROM groupe WHERE nom = 'Static UCOB (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Thancred Waters'),
        (SELECT id FROM groupe WHERE nom = 'Static UCOB (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Yshtola Rhul'), (SELECT id FROM groupe WHERE nom = 'Static UCOB (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Urianger Augurelt'),
        (SELECT id FROM groupe WHERE nom = 'Static UCOB (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Alphinaud Leveilleur'),
        (SELECT id FROM groupe WHERE nom = 'Static UCOB (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Alisaie Leveilleur'),
        (SELECT id FROM groupe WHERE nom = 'Static UCOB (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Estinien Wyrmblood'),
        (SELECT id FROM groupe WHERE nom = 'Static UCOB (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Graha Tia'), (SELECT id FROM groupe WHERE nom = 'Static UCOB (Fatal)'));

-- ---------------------------------------------------------
-- GROUPE 2 : Static UWU (8 Joueurs - Les Dirigeants)
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Raubahn Aldynn'), (SELECT id FROM groupe WHERE nom = 'Static UWU (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Pipin Tarupin'), (SELECT id FROM groupe WHERE nom = 'Static UWU (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Aymeric de Borel'),
        (SELECT id FROM groupe WHERE nom = 'Static UWU (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Haurchefant Greystone'),
        (SELECT id FROM groupe WHERE nom = 'Static UWU (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Kan-E-Senna'), (SELECT id FROM groupe WHERE nom = 'Static UWU (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Sultana Nanamo'), (SELECT id FROM groupe WHERE nom = 'Static UWU (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Merlwyb Bloefhiswyn'),
        (SELECT id FROM groupe WHERE nom = 'Static UWU (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Lyse Hext'), -- Remplaçante d'Aymeric
        (SELECT id FROM groupe WHERE nom = 'Static UWU (Fatal)'));

-- ---------------------------------------------------------
-- GROUPE 3 : CL Les Chocobos Fringants (15 Joueurs)
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Cid Garlond'),
        (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Biggs'), (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Wedge'), (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Nero tol Scaeva'),
        (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Gaius Baelsar'),
        (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Hildibrand Manderville'),
        (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Godbert Manderville'),
        (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Julyan Manderville'),
        (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Nashu Mhakaracca'),
        (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Fray Myste'),
        (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Sidurgu Orl'),
        (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Rielle'), (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Curious Gorge'),
        (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Broken Mountain'),
        (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants')),
       ((SELECT id FROM player WHERE nom = 'Jenlyns'), (SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants'));

-- ---------------------------------------------------------
-- GROUPE 4 : Alliance 24 - Euphrosyne (20 Joueurs - Multi-groupes)
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Meteor Survivor'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Yshtola Rhul'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Alphinaud Leveilleur'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Alisaie Leveilleur'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Raubahn Aldynn'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Aymeric de Borel'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Kan-E-Senna'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Cid Garlond'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Hildibrand Manderville'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Nashu Mhakaracca'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Eschiva'), (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Alka Zolka'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Surito Carito'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Leveva'), (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Jandelaine'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Gegeruju'), (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Momodi Modi'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Baderon Tenfingers'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Miounne'), (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne')),
       ((SELECT id FROM player WHERE nom = 'Moenbryda Wilfsunn'),
        (SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne'));

-- ---------------------------------------------------------
-- GROUPES 5 à 20 : Les autres statics et groupes (5 Joueurs min)
-- Note: Pour optimiser l'espace, voici un exemple de logique appliquée sur plusieurs groupes
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES
-- Groupe 5 (Static TEA)
((SELECT id FROM player WHERE nom = 'Yugiri Mistwalker'), (SELECT id FROM groupe WHERE nom = 'Static TEA (Fatal)')),
((SELECT id FROM player WHERE nom = 'Hien Rijin'), (SELECT id FROM groupe WHERE nom = 'Static TEA (Fatal)')),
((SELECT id FROM player WHERE nom = 'Gosetsu Everstrike'), (SELECT id FROM groupe WHERE nom = 'Static TEA (Fatal)')),
((SELECT id FROM player WHERE nom = 'Lyse Hext'), (SELECT id FROM groupe WHERE nom = 'Static TEA (Fatal)')),
((SELECT id FROM player WHERE nom = 'Tataru Taru'), (SELECT id FROM groupe WHERE nom = 'Static TEA (Fatal)')),

-- Groupe 6 (Roster Lalafell)
((SELECT id FROM player WHERE nom = 'Tataru Taru'), (SELECT id FROM groupe WHERE nom = 'Roster Lalafell')),
((SELECT id FROM player WHERE nom = 'Pipin Tarupin'), (SELECT id FROM groupe WHERE nom = 'Roster Lalafell')),
((SELECT id FROM player WHERE nom = 'Papalymo Totolymo'), (SELECT id FROM groupe WHERE nom = 'Roster Lalafell')),
((SELECT id FROM player WHERE nom = 'Krile Mayer'), (SELECT id FROM groupe WHERE nom = 'Roster Lalafell')),
((SELECT id FROM player WHERE nom = 'Momodi Modi'), (SELECT id FROM groupe WHERE nom = 'Roster Lalafell')),

-- Groupe 7 (Mercenaires)
((SELECT id FROM player WHERE nom = 'Fray Myste'), (SELECT id FROM groupe WHERE nom = 'Mercenaires (Gils runs)')),
((SELECT id FROM player WHERE nom = 'Nero tol Scaeva'), (SELECT id FROM groupe WHERE nom = 'Mercenaires (Gils runs)')),
((SELECT id FROM player WHERE nom = 'Estinien Wyrmblood'),
 (SELECT id FROM groupe WHERE nom = 'Mercenaires (Gils runs)')),
((SELECT id FROM player WHERE nom = 'Yshtola Rhul'), (SELECT id FROM groupe WHERE nom = 'Mercenaires (Gils runs)')),
((SELECT id FROM player WHERE nom = 'Meteor Survivor'), (SELECT id FROM groupe WHERE nom = 'Mercenaires (Gils runs)')),

-- Groupe 8 (Static DSR)
((SELECT id FROM player WHERE nom = 'Aymeric de Borel'), (SELECT id FROM groupe WHERE nom = 'Static DSR (Fatal)')),
((SELECT id FROM player WHERE nom = 'Estinien Wyrmblood'), (SELECT id FROM groupe WHERE nom = 'Static DSR (Fatal)')),
((SELECT id FROM player WHERE nom = 'Haurchefant Greystone'), (SELECT id FROM groupe WHERE nom = 'Static DSR (Fatal)')),
((SELECT id FROM player WHERE nom = 'Alphinaud Leveilleur'), (SELECT id FROM groupe WHERE nom = 'Static DSR (Fatal)')),
((SELECT id FROM player WHERE nom = 'Yshtola Rhul'), (SELECT id FROM groupe WHERE nom = 'Static DSR (Fatal)')),

-- Groupe 9 (Farm Pandaemonium)
((SELECT id FROM player WHERE nom = 'Thancred Waters'), (SELECT id FROM groupe WHERE nom = 'Farm Pandaemonium')),
((SELECT id FROM player WHERE nom = 'Urianger Augurelt'), (SELECT id FROM groupe WHERE nom = 'Farm Pandaemonium')),
((SELECT id FROM player WHERE nom = 'Gaius Baelsar'), (SELECT id FROM groupe WHERE nom = 'Farm Pandaemonium')),
((SELECT id FROM player WHERE nom = 'Moenbryda Wilfsunn'), (SELECT id FROM groupe WHERE nom = 'Farm Pandaemonium')),
((SELECT id FROM player WHERE nom = 'Rielle'), (SELECT id FROM groupe WHERE nom = 'Farm Pandaemonium')),

-- Groupe 10 (Chasseurs de Rangs S)
((SELECT id FROM player WHERE nom = 'Miounne'), (SELECT id FROM groupe WHERE nom = 'Chasseurs de Rangs S')),
((SELECT id FROM player WHERE nom = 'Baderon Tenfingers'), (SELECT id FROM groupe WHERE nom = 'Chasseurs de Rangs S')),
((SELECT id FROM player WHERE nom = 'Momodi Modi'), (SELECT id FROM groupe WHERE nom = 'Chasseurs de Rangs S')),
((SELECT id FROM player WHERE nom = 'Eschiva'), (SELECT id FROM groupe WHERE nom = 'Chasseurs de Rangs S')),
((SELECT id FROM player WHERE nom = 'Leveva'), (SELECT id FROM groupe WHERE nom = 'Chasseurs de Rangs S'));

-- ---------------------------------------------------------
-- Groupe 11 : Static TOP (Fatal) - 8 joueurs
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Godbert Manderville'),
        (SELECT id FROM groupe WHERE nom = 'Static TOP (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Julyan Manderville'),
        (SELECT id FROM groupe WHERE nom = 'Static TOP (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Hildibrand Manderville'),
        (SELECT id FROM groupe WHERE nom = 'Static TOP (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Nashu Mhakaracca'),
        (SELECT id FROM groupe WHERE nom = 'Static TOP (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Gosetsu Everstrike'),
        (SELECT id FROM groupe WHERE nom = 'Static TOP (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Yugiri Mistwalker'),
        (SELECT id FROM groupe WHERE nom = 'Static TOP (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Hien Rijin'), (SELECT id FROM groupe WHERE nom = 'Static TOP (Fatal)')),
       ((SELECT id FROM player WHERE nom = 'Lyse Hext'), (SELECT id FROM groupe WHERE nom = 'Static TOP (Fatal)'));

-- ---------------------------------------------------------
-- Groupe 12 : Progression M1S-M4S - 8 joueurs
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Alka Zolka'), (SELECT id FROM groupe WHERE nom = 'Progression M1S-M4S')),
       ((SELECT id FROM player WHERE nom = 'Surito Carito'), (SELECT id FROM groupe WHERE nom = 'Progression M1S-M4S')),
       ((SELECT id FROM player WHERE nom = 'Leveva'), (SELECT id FROM groupe WHERE nom = 'Progression M1S-M4S')),
       ((SELECT id FROM player WHERE nom = 'Jandelaine'), (SELECT id FROM groupe WHERE nom = 'Progression M1S-M4S')),
       ((SELECT id FROM player WHERE nom = 'Gegeruju'), (SELECT id FROM groupe WHERE nom = 'Progression M1S-M4S')),
       ((SELECT id FROM player WHERE nom = 'Curious Gorge'), (SELECT id FROM groupe WHERE nom = 'Progression M1S-M4S')),
       ((SELECT id FROM player WHERE nom = 'Broken Mountain'),
        (SELECT id FROM groupe WHERE nom = 'Progression M1S-M4S')),
       ((SELECT id FROM player WHERE nom = 'Jenlyns'), (SELECT id FROM groupe WHERE nom = 'Progression M1S-M4S'));

-- ---------------------------------------------------------
-- Groupe 13 : Roster Blind Arcadion - 8 joueurs
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Cid Garlond'), (SELECT id FROM groupe WHERE nom = 'Roster Blind Arcadion')),
       ((SELECT id FROM player WHERE nom = 'Nero tol Scaeva'),
        (SELECT id FROM groupe WHERE nom = 'Roster Blind Arcadion')),
       ((SELECT id FROM player WHERE nom = 'Biggs'), (SELECT id FROM groupe WHERE nom = 'Roster Blind Arcadion')),
       ((SELECT id FROM player WHERE nom = 'Wedge'), (SELECT id FROM groupe WHERE nom = 'Roster Blind Arcadion')),
       ((SELECT id FROM player WHERE nom = 'Gaius Baelsar'),
        (SELECT id FROM groupe WHERE nom = 'Roster Blind Arcadion')),
       ((SELECT id FROM player WHERE nom = 'Moenbryda Wilfsunn'),
        (SELECT id FROM groupe WHERE nom = 'Roster Blind Arcadion')),
       ((SELECT id FROM player WHERE nom = 'Minfilia Warde'),
        (SELECT id FROM groupe WHERE nom = 'Roster Blind Arcadion')),
       ((SELECT id FROM player WHERE nom = 'Krile Mayer'), (SELECT id FROM groupe WHERE nom = 'Roster Blind Arcadion'));

-- ---------------------------------------------------------
-- Groupe 14 : CL Gardiens d Eorzea - 10 joueurs
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Raubahn Aldynn'),
        (SELECT id FROM groupe WHERE nom = 'CL Gardiens d Eorzea')),
       ((SELECT id FROM player WHERE nom = 'Pipin Tarupin'),
        (SELECT id FROM groupe WHERE nom = 'CL Gardiens d Eorzea')),
       ((SELECT id FROM player WHERE nom = 'Aymeric de Borel'),
        (SELECT id FROM groupe WHERE nom = 'CL Gardiens d Eorzea')),
       ((SELECT id FROM player WHERE nom = 'Kan-E-Senna'), (SELECT id FROM groupe WHERE nom = 'CL Gardiens d Eorzea')),
       ((SELECT id FROM player WHERE nom = 'Sultana Nanamo'),
        (SELECT id FROM groupe WHERE nom = 'CL Gardiens d Eorzea')),
       ((SELECT id FROM player WHERE nom = 'Merlwyb Bloefhiswyn'),
        (SELECT id FROM groupe WHERE nom = 'CL Gardiens d Eorzea')),
       ((SELECT id FROM player WHERE nom = 'Raya-O-Senna'), (SELECT id FROM groupe WHERE nom = 'CL Gardiens d Eorzea')),
       ((SELECT id FROM player WHERE nom = 'A-Ruhn-Senna'), (SELECT id FROM groupe WHERE nom = 'CL Gardiens d Eorzea')),
       ((SELECT id FROM player WHERE nom = 'Eschiva'), (SELECT id FROM groupe WHERE nom = 'CL Gardiens d Eorzea')),
       ((SELECT id FROM player WHERE nom = 'Miounne'), (SELECT id FROM groupe WHERE nom = 'CL Gardiens d Eorzea'));

-- ---------------------------------------------------------
-- Groupe 15 : Speedkill Asphodelos - 8 joueurs
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Meteor Survivor'),
        (SELECT id FROM groupe WHERE nom = 'Speedkill Asphodelos')),
       ((SELECT id FROM player WHERE nom = 'Estinien Wyrmblood'),
        (SELECT id FROM groupe WHERE nom = 'Speedkill Asphodelos')),
       ((SELECT id FROM player WHERE nom = 'Yshtola Rhul'), (SELECT id FROM groupe WHERE nom = 'Speedkill Asphodelos')),
       ((SELECT id FROM player WHERE nom = 'Thancred Waters'),
        (SELECT id FROM groupe WHERE nom = 'Speedkill Asphodelos')),
       ((SELECT id FROM player WHERE nom = 'Graha Tia'), (SELECT id FROM groupe WHERE nom = 'Speedkill Asphodelos')),
       ((SELECT id FROM player WHERE nom = 'Godbert Manderville'),
        (SELECT id FROM groupe WHERE nom = 'Speedkill Asphodelos')),
       ((SELECT id FROM player WHERE nom = 'Julyan Manderville'),
        (SELECT id FROM groupe WHERE nom = 'Speedkill Asphodelos')),
       ((SELECT id FROM player WHERE nom = 'Nero tol Scaeva'),
        (SELECT id FROM groupe WHERE nom = 'Speedkill Asphodelos'));

-- ---------------------------------------------------------
-- Groupe 16 : Farm Montures Extremes - 8 joueurs
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Baderon Tenfingers'),
        (SELECT id FROM groupe WHERE nom = 'Farm Montures Extremes')),
       ((SELECT id FROM player WHERE nom = 'Momodi Modi'),
        (SELECT id FROM groupe WHERE nom = 'Farm Montures Extremes')),
       ((SELECT id FROM player WHERE nom = 'Miounne'), (SELECT id FROM groupe WHERE nom = 'Farm Montures Extremes')),
       ((SELECT id FROM player WHERE nom = 'Jandelaine'), (SELECT id FROM groupe WHERE nom = 'Farm Montures Extremes')),
       ((SELECT id FROM player WHERE nom = 'Gegeruju'), (SELECT id FROM groupe WHERE nom = 'Farm Montures Extremes')),
       ((SELECT id FROM player WHERE nom = 'Leveva'), (SELECT id FROM groupe WHERE nom = 'Farm Montures Extremes')),
       ((SELECT id FROM player WHERE nom = 'Surito Carito'),
        (SELECT id FROM groupe WHERE nom = 'Farm Montures Extremes')),
       ((SELECT id FROM player WHERE nom = 'Alka Zolka'), (SELECT id FROM groupe WHERE nom = 'Farm Montures Extremes'));

-- ---------------------------------------------------------
-- Groupe 17 : Static Nuit Blanche - 8 joueurs
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Fray Myste'), (SELECT id FROM groupe WHERE nom = 'Static Nuit Blanche')),
       ((SELECT id FROM player WHERE nom = 'Sidurgu Orl'), (SELECT id FROM groupe WHERE nom = 'Static Nuit Blanche')),
       ((SELECT id FROM player WHERE nom = 'Rielle'), (SELECT id FROM groupe WHERE nom = 'Static Nuit Blanche')),
       ((SELECT id FROM player WHERE nom = 'Urianger Augurelt'),
        (SELECT id FROM groupe WHERE nom = 'Static Nuit Blanche')),
       ((SELECT id FROM player WHERE nom = 'Thancred Waters'),
        (SELECT id FROM groupe WHERE nom = 'Static Nuit Blanche')),
       ((SELECT id FROM player WHERE nom = 'Minfilia Warde'),
        (SELECT id FROM groupe WHERE nom = 'Static Nuit Blanche')),
       ((SELECT id FROM player WHERE nom = 'Moenbryda Wilfsunn'),
        (SELECT id FROM groupe WHERE nom = 'Static Nuit Blanche')),
       ((SELECT id FROM player WHERE nom = 'Krile Mayer'), (SELECT id FROM groupe WHERE nom = 'Static Nuit Blanche'));

-- ---------------------------------------------------------
-- Groupe 18 : Roster Matinal - 8 joueurs
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Kan-E-Senna'), (SELECT id FROM groupe WHERE nom = 'Roster Matinal')),
       ((SELECT id FROM player WHERE nom = 'Raya-O-Senna'), (SELECT id FROM groupe WHERE nom = 'Roster Matinal')),
       ((SELECT id FROM player WHERE nom = 'A-Ruhn-Senna'), (SELECT id FROM groupe WHERE nom = 'Roster Matinal')),
       ((SELECT id FROM player WHERE nom = 'Eschiva'), (SELECT id FROM groupe WHERE nom = 'Roster Matinal')),
       ((SELECT id FROM player WHERE nom = 'Alphinaud Leveilleur'),
        (SELECT id FROM groupe WHERE nom = 'Roster Matinal')),
       ((SELECT id FROM player WHERE nom = 'Alisaie Leveilleur'), (SELECT id FROM groupe WHERE nom = 'Roster Matinal')),
       ((SELECT id FROM player WHERE nom = 'Tataru Taru'), (SELECT id FROM groupe WHERE nom = 'Roster Matinal')),
       ((SELECT id FROM player WHERE nom = 'Papalymo Totolymo'), (SELECT id FROM groupe WHERE nom = 'Roster Matinal'));

-- ---------------------------------------------------------
-- Groupe 19 : Static Midcore Soirée - 8 joueurs
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Aymeric de Borel'),
        (SELECT id FROM groupe WHERE nom = 'Static Midcore Soirée')),
       ((SELECT id FROM player WHERE nom = 'Haurchefant Greystone'),
        (SELECT id FROM groupe WHERE nom = 'Static Midcore Soirée')),
       ((SELECT id FROM player WHERE nom = 'Estinien Wyrmblood'),
        (SELECT id FROM groupe WHERE nom = 'Static Midcore Soirée')),
       ((SELECT id FROM player WHERE nom = 'Yugiri Mistwalker'),
        (SELECT id FROM groupe WHERE nom = 'Static Midcore Soirée')),
       ((SELECT id FROM player WHERE nom = 'Hien Rijin'), (SELECT id FROM groupe WHERE nom = 'Static Midcore Soirée')),
       ((SELECT id FROM player WHERE nom = 'Gosetsu Everstrike'),
        (SELECT id FROM groupe WHERE nom = 'Static Midcore Soirée')),
       ((SELECT id FROM player WHERE nom = 'Lyse Hext'), (SELECT id FROM groupe WHERE nom = 'Static Midcore Soirée')),
       ((SELECT id FROM player WHERE nom = 'Raubahn Aldynn'),
        (SELECT id FROM groupe WHERE nom = 'Static Midcore Soirée'));

-- ---------------------------------------------------------
-- Groupe 20 : Roster Détente et Wipes - 8 joueurs
-- ---------------------------------------------------------
INSERT INTO player_groupe (player_id, groupe_id)
VALUES ((SELECT id FROM player WHERE nom = 'Hildibrand Manderville'),
        (SELECT id FROM groupe WHERE nom = 'Roster Détente et Wipes')),
       ((SELECT id FROM player WHERE nom = 'Nashu Mhakaracca'),
        (SELECT id FROM groupe WHERE nom = 'Roster Détente et Wipes')),
       ((SELECT id FROM player WHERE nom = 'Gegeruju'), (SELECT id FROM groupe WHERE nom = 'Roster Détente et Wipes')),
       ((SELECT id FROM player WHERE nom = 'Jandelaine'),
        (SELECT id FROM groupe WHERE nom = 'Roster Détente et Wipes')),
       ((SELECT id FROM player WHERE nom = 'Curious Gorge'),
        (SELECT id FROM groupe WHERE nom = 'Roster Détente et Wipes')),
       ((SELECT id FROM player WHERE nom = 'Broken Mountain'),
        (SELECT id FROM groupe WHERE nom = 'Roster Détente et Wipes')),
       ((SELECT id FROM player WHERE nom = 'Godbert Manderville'),
        (SELECT id FROM groupe WHERE nom = 'Roster Détente et Wipes')),
       ((SELECT id FROM player WHERE nom = 'Julyan Manderville'),
        (SELECT id FROM groupe WHERE nom = 'Roster Détente et Wipes'));

-- Insertion des 10 Raids (dtype = 'Raid')
INSERT INTO activite (dtype, horaire, nom, difficulte, type, is_farm_session, nb_cartes)
VALUES ('Raid', CURRENT_DATE + INTERVAL '1 day 21:00:00', 'L''Abîme infini de Bahamut (UCOB)', 'Fatal', 'Raid 8', false,
        NULL),
       ('Raid', CURRENT_DATE + INTERVAL '2 days 20:30:00', 'La Fantasmagorie de l''Ultima Arma (UWU)', 'Fatal',
        'Raid 8', true, NULL),
       ('Raid', CURRENT_DATE + INTERVAL '5 days 21:00:00', 'Le Purgatoire du Pandæmonium - Abîme', 'Sadique', 'Raid 8',
        true, NULL),
       ('Raid', CURRENT_DATE + INTERVAL '7 days 21:15:00', 'L''Arcadion - Section Mi-Lourds (M4S)', 'Sadique', 'Raid 8',
        false, NULL),
       ('Raid', CURRENT_DATE + INTERVAL '9 days 15:00:00', 'Mythe éorzéen - Euphrosyne', 'Normal',
        'Raid en alliance 24', true, NULL),
       ('Raid', CURRENT_DATE + INTERVAL '12 days 20:45:00', 'L''Odyssée d''Alexander (TEA)', 'Fatal', 'Raid 8', false,
        NULL),
       ('Raid', CURRENT_DATE + INTERVAL '15 days 21:00:00', 'La Guerre du chant des dragons (DSR)', 'Fatal', 'Raid 8',
        false, NULL),
       ('Raid', CURRENT_DATE + INTERVAL '19 days 21:30:00', 'Oméga - Alphastice (O12S)', 'Sadique', 'Raid 8', true,
        NULL),
       ('Raid', CURRENT_DATE + INTERVAL '22 days 14:00:00', 'Mythe éorzéen - Aglaé', 'Normal', 'Raid en alliance 24',
        false, NULL),
       ('Raid', CURRENT_DATE + INTERVAL '29 days 20:30:00', 'Le Protocole Oméga (TOP)', 'Fatal', 'Raid 8', true, NULL);

-- Insertion des 5 Chasses au Trésor (dtype = 'ChasseTresor')
INSERT INTO activite (dtype, horaire, nom, difficulte, type, is_farm_session, nb_cartes)
VALUES ('ChasseTresor', CURRENT_DATE + INTERVAL '3 days 14:00:00', NULL, NULL,
        'Carte au trésor en peau de Kumbhir (Niv 90)', NULL, 10),
       ('ChasseTresor', CURRENT_DATE + INTERVAL '8 days 15:30:00', NULL, NULL,
        'Carte au trésor en peau d''Ophiotauros (Niv 90)', NULL, 15),
       ('ChasseTresor', CURRENT_DATE + INTERVAL '16 days 20:00:00', NULL, NULL,
        'Carte au trésor en peau de Br''aax (Niv 100)', NULL, 8),
       ('ChasseTresor', CURRENT_DATE + INTERVAL '23 days 16:00:00', NULL, NULL,
        'Carte au trésor en peau de Gazelle (Niv 70)', NULL, 12),
       ('ChasseTresor', CURRENT_DATE + INTERVAL '27 days 21:00:00', NULL, NULL,
        'Carte au trésor en peau de Glaucus (Niv 100)', NULL, 20);

-- ==========================================
-- ETAPE 7 : ASSOCIATION DES GROUPES AUX ACTIVITES
-- ==========================================

-- Associations pour les Raids Fatals (Statics dédiées)
INSERT INTO groupe_activite (groupe_id, activite_id)
VALUES ((SELECT id FROM groupe WHERE nom = 'Static UCOB (Fatal)'),
        (SELECT id FROM activite WHERE nom = 'L''Abîme infini de Bahamut (UCOB)')),
       ((SELECT id FROM groupe WHERE nom = 'Static UWU (Fatal)'),
        (SELECT id FROM activite WHERE nom = 'La Fantasmagorie de l''Ultima Arma (UWU)')),
       ((SELECT id FROM groupe WHERE nom = 'Static TEA (Fatal)'),
        (SELECT id FROM activite WHERE nom = 'L''Odyssée d''Alexander (TEA)')),
       ((SELECT id FROM groupe WHERE nom = 'Static DSR (Fatal)'),
        (SELECT id FROM activite WHERE nom = 'La Guerre du chant des dragons (DSR)')),
       ((SELECT id FROM groupe WHERE nom = 'Static TOP (Fatal)'),
        (SELECT id FROM activite WHERE nom = 'Le Protocole Oméga (TOP)')),
       ((SELECT id FROM groupe WHERE nom = 'Speedkill Asphodelos'),
        (SELECT id FROM activite WHERE nom = 'Le Protocole Oméga (TOP)'));

-- Associations pour les Raids Sadiques et Farm (CORRIGÉ ICI)
INSERT INTO groupe_activite (groupe_id, activite_id)
VALUES ((SELECT id FROM groupe WHERE nom = 'Progression M1S-M4S'),
        (SELECT id FROM activite WHERE nom = 'L''Arcadion - Section Mi-Lourds (M4S)')),
       ((SELECT id FROM groupe WHERE nom = 'Farm Pandaemonium'),
        (SELECT id FROM activite WHERE nom = 'Le Purgatoire du Pandæmonium - Abîme')),
       ((SELECT id FROM groupe WHERE nom = 'Roster Lalafell'),
        (SELECT id FROM activite WHERE nom = 'Oméga - Alphastice (O12S)')), -- <--- Remplacé ici !
       ((SELECT id FROM groupe WHERE nom = 'Farm Montures Extremes'),
        (SELECT id FROM activite WHERE nom = 'Oméga - Alphastice (O12S)')),
       ((SELECT id FROM groupe WHERE nom = 'Roster Blind Arcadion'),
        (SELECT id FROM activite WHERE nom = 'L''Arcadion - Section Mi-Lourds (M4S)')),
       ((SELECT id FROM groupe WHERE nom = 'Static Midcore Soirée'),
        (SELECT id FROM activite WHERE nom = 'Le Purgatoire du Pandæmonium - Abîme'));

-- Associations pour les Raids en Alliance (Groupes larges)
INSERT INTO groupe_activite (groupe_id, activite_id)
VALUES ((SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne'),
        (SELECT id FROM activite WHERE nom = 'Mythe éorzéen - Euphrosyne')),
       ((SELECT id FROM groupe WHERE nom = 'Alliance 24 - Euphrosyne'),
        (SELECT id FROM activite WHERE nom = 'Mythe éorzéen - Aglaé')),
       ((SELECT id FROM groupe WHERE nom = 'CL Gardiens d Eorzea'),
        (SELECT id FROM activite WHERE nom = 'Mythe éorzéen - Euphrosyne'));

-- Associations pour les Chasses au Trésor (Compagnies Libres et Groupes Détente)
INSERT INTO groupe_activite (groupe_id, activite_id)
VALUES ((SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants'),
        (SELECT id FROM activite WHERE type LIKE '%Kumbhir%')),
       ((SELECT id FROM groupe WHERE nom = 'CL Les Chocobos Fringants'),
        (SELECT id FROM activite WHERE type LIKE '%Ophiotauros%')),
       ((SELECT id FROM groupe WHERE nom = 'CL Gardiens d Eorzea'),
        (SELECT id FROM activite WHERE type LIKE '%Br''aax%')),
       ((SELECT id FROM groupe WHERE nom = 'Roster Détente et Wipes'),
        (SELECT id FROM activite WHERE type LIKE '%Gazelle%')),
       ((SELECT id FROM groupe WHERE nom = 'Roster Matinal'), (SELECT id FROM activite WHERE type LIKE '%Glaucus%')),
       ((SELECT id FROM groupe WHERE nom = 'Static Nuit Blanche'),
        (SELECT id FROM activite WHERE type LIKE '%Glaucus%'));
COMMIT;