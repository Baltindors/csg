-- Insert six background options
INSERT INTO backgrounds (title, description, attributes) VALUES
('Eldorian', 'Heirs of Calliope’s grace, the Eldorians blend nature and arcane craft to build and bolster with unmatched precision.', JSON_ARRAY('+5 Construction Speed', '+2 Mana Regeneration')),
('Solarian Flameborn', 'Blessed by Helios, Solarians wield radiant fury and unyielding passion to dominate the battlefield and inspire allies.', JSON_ARRAY('+5 Fire Damage', '+2 Unit Morale')),
('Stoneborn', 'Forged in the depths, these stalwart Masons channel the might of Aegis to endure and defend with impenetrable resolve.', JSON_ARRAY('+5 Defense', '+2 Structure Durability')),
('Maritan Tidebinder', 'Guided by the muse Elysia, Maritans command the tides and trade, disrupting foes and enchanting allies with melodic warfare.', JSON_ARRAY('+5 Naval Speed', '+2 Gold per Trade Route')),
('Zephyrian', 'Favored by Zephyrus, these nomads are swift and elusive, commanding the battlefield with mobility and precision strikes.', JSON_ARRAY('+5 Movement Speed', '+2 Vision Range')),
('Vortani', 'Twisted by void and vengeance, these outcasts wield chaos to corrupt and decay, turning strength into suffering.', JSON_ARRAY('+5 Corruption Damage', '+2 Zephyrians Unit Limit'));
