/* =========================================================
   Fragenkatalog
   stufe:     1–15 (Frage 1 = 50 €, Frage 15 = 1.000.000 €)
   antworten: genau 4 Antworten – die Reihenfolge wird im Spiel gemischt
   richtig:   Position der richtigen Antwort in "antworten" (0 = erste, 1 = zweite, …)

   Eigene Fragen einfach nach demselben Muster ergänzen.
   Gibt es für eine Stufe keine (unbenutzte) Frage mehr, nimmt das Spiel
   eine aus der nächstgelegenen Stufe.
========================================================= */
const FRAGEN = [
  // ---------- Stufe 1 · 50 € ----------
  { stufe:1, frage:'Wie viele Beine hat eine Spinne?', antworten:['8','6','10','4'], richtig:0 },
  { stufe:1, frage:'Welche Farbe entsteht, wenn man Blau und Gelb mischt?', antworten:['Lila','Grün','Orange','Braun'], richtig:1 },
  { stufe:1, frage:'Woraus trinkt man auf dem Oktoberfest traditionell sein Bier?', antworten:['Aus der Tasse','Aus dem Römer','Aus der Maß','Aus dem Kelch'], richtig:2 },

  // ---------- Stufe 2 · 100 € ----------
  { stufe:2, frage:'Was ist die Hauptstadt von Frankreich?', antworten:['Lyon','Marseille','Nizza','Paris'], richtig:3 },
  { stufe:2, frage:'Wie viele Tage hat ein Schaltjahr?', antworten:['365','366','364','367'], richtig:1 },
  { stufe:2, frage:'Welches Organ pumpt das Blut durch den Körper?', antworten:['Herz','Lunge','Leber','Niere'], richtig:0 },

  // ---------- Stufe 3 · 200 € ----------
  { stufe:3, frage:'Wie heißt der höchste Berg Deutschlands?', antworten:['Watzmann','Brocken','Zugspitze','Feldberg'], richtig:2 },
  { stufe:3, frage:'Welcher Planet ist der Sonne am nächsten?', antworten:['Venus','Merkur','Mars','Jupiter'], richtig:1 },
  { stufe:3, frage:'Wie viele Spieler einer Fußballmannschaft stehen gleichzeitig auf dem Platz?', antworten:['10','12','9','11'], richtig:3 },

  // ---------- Stufe 4 · 300 € ----------
  { stufe:4, frage:'In welcher Stadt steht das Brandenburger Tor?', antworten:['Berlin','Potsdam','Brandenburg an der Havel','Hamburg'], richtig:0 },
  { stufe:4, frage:'Welches chemische Symbol hat Gold?', antworten:['Ag','Go','Au','Gd'], richtig:2 },
  { stufe:4, frage:'Wer malte die „Mona Lisa“?', antworten:['Michelangelo','Leonardo da Vinci','Raffael','Botticelli'], richtig:1 },

  // ---------- Stufe 5 · 500 € ----------
  { stufe:5, frage:'Wie viele Bundesländer hat Deutschland?', antworten:['15','14','17','16'], richtig:3 },
  { stufe:5, frage:'Welcher Fluss fließt durch Köln?', antworten:['Main','Rhein','Elbe','Mosel'], richtig:1 },
  { stufe:5, frage:'Aus wie vielen Feldern besteht ein Schachbrett?', antworten:['64','32','81','100'], richtig:0 },

  // ---------- Stufe 6 · 1.000 € ----------
  { stufe:6, frage:'Welches ist das größte Organ des Menschen?', antworten:['Leber','Lunge','Haut','Darm'], richtig:2 },
  { stufe:6, frage:'In welchem Jahr fiel die Berliner Mauer?', antworten:['1987','1989','1990','1991'], richtig:1 },
  { stufe:6, frage:'Wie heißt die Hauptstadt von Australien?', antworten:['Sydney','Melbourne','Perth','Canberra'], richtig:3 },

  // ---------- Stufe 7 · 2.000 € ----------
  { stufe:7, frage:'Wer vertonte Schillers „Ode an die Freude“ in seiner 9. Sinfonie?', antworten:['Ludwig van Beethoven','Wolfgang Amadeus Mozart','Johann Sebastian Bach','Johannes Brahms'], richtig:0 },
  { stufe:7, frage:'Welches Gas nehmen Pflanzen bei der Photosynthese auf?', antworten:['Sauerstoff','Kohlendioxid','Stickstoff','Wasserstoff'], richtig:1 },
  { stufe:7, frage:'Wie viele Saiten hat eine klassische Gitarre?', antworten:['4','5','6','7'], richtig:2 },

  // ---------- Stufe 8 · 4.000 € ----------
  { stufe:8, frage:'Welches Land hat seit 2023 die meisten Einwohner der Welt?', antworten:['China','USA','Indonesien','Indien'], richtig:3 },
  { stufe:8, frage:'Was misst man in der Einheit Hertz?', antworten:['Frequenz','Druck','Spannung','Leistung'], richtig:0 },
  { stufe:8, frage:'Welcher ist der größte Ozean der Erde?', antworten:['Atlantik','Pazifik','Indischer Ozean','Arktischer Ozean'], richtig:1 },

  // ---------- Stufe 9 · 8.000 € ----------
  { stufe:9, frage:'Welcher Fluss hat die längste Fließstrecke innerhalb Deutschlands?', antworten:['Elbe','Donau','Rhein','Main'], richtig:2 },
  { stufe:9, frage:'Wer schrieb das Drama „Die Räuber“?', antworten:['Johann Wolfgang von Goethe','Friedrich Schiller','Gotthold Ephraim Lessing','Heinrich von Kleist'], richtig:1 },
  { stufe:9, frage:'Für welches Element steht das chemische Symbol „Fe“?', antworten:['Fluor','Francium','Fermium','Eisen'], richtig:3 },

  // ---------- Stufe 10 · 16.000 € ----------
  { stufe:10, frage:'In welchem Jahr landeten erstmals Menschen auf dem Mond?', antworten:['1969','1967','1971','1965'], richtig:0 },
  { stufe:10, frage:'Wie viele Knochen hat ein erwachsener Mensch ungefähr?', antworten:['186','206','226','256'], richtig:1 },
  { stufe:10, frage:'Welches Land gewann die Fußball-Weltmeisterschaft 2014?', antworten:['Argentinien','Brasilien','Deutschland','Spanien'], richtig:2 },

  // ---------- Stufe 11 · 32.000 € ----------
  { stufe:11, frage:'Welche Stadt war von 1949 bis 1990 Hauptstadt der Bundesrepublik Deutschland?', antworten:['Frankfurt am Main','Köln','Düsseldorf','Bonn'], richtig:3 },
  { stufe:11, frage:'Wer erfand in Europa den Buchdruck mit beweglichen Lettern?', antworten:['Johannes Gutenberg','Albrecht Dürer','Martin Luther','Johannes Kepler'], richtig:0 },
  { stufe:11, frage:'Wie viele Herzen hat ein Oktopus?', antworten:['1','2','3','4'], richtig:2 },

  // ---------- Stufe 12 · 64.000 € ----------
  { stufe:12, frage:'Welcher ist der flächenmäßig kleinste Staat der Welt?', antworten:['Monaco','Vatikanstadt','San Marino','Liechtenstein'], richtig:1 },
  { stufe:12, frage:'In welchem Jahr wurde der Euro als Bargeld eingeführt?', antworten:['1999','2000','2001','2002'], richtig:3 },
  { stufe:12, frage:'Welches ist das schnellste Landtier der Welt?', antworten:['Gepard','Löwe','Gabelbock','Springbock'], richtig:0 },

  // ---------- Stufe 13 · 125.000 € ----------
  { stufe:13, frage:'Wie heißt die Hauptstadt von Kanada?', antworten:['Toronto','Montreal','Ottawa','Vancouver'], richtig:2 },
  { stufe:13, frage:'Wer formulierte die drei Gesetze der Planetenbewegung?', antworten:['Galileo Galilei','Johannes Kepler','Nikolaus Kopernikus','Isaac Newton'], richtig:1 },
  { stufe:13, frage:'Was ist ein „Haiku“?', antworten:['Eine Kampfkunst','Eine Teezeremonie','Eine Papierfaltkunst','Eine japanische Gedichtform'], richtig:3 },

  // ---------- Stufe 14 · 500.000 € ----------
  { stufe:14, frage:'Welches chemische Element ist nach dem Planeten Uranus benannt?', antworten:['Uran','Neptunium','Plutonium','Thorium'], richtig:0 },
  { stufe:14, frage:'Wie viele vollendete Sinfonien komponierte Ludwig van Beethoven?', antworten:['7','10','9','12'], richtig:2 },
  { stufe:14, frage:'In welcher Stadt wurde Wolfgang Amadeus Mozart geboren?', antworten:['Wien','Salzburg','Linz','Innsbruck'], richtig:1 },

  // ---------- Stufe 15 · 1.000.000 € ----------
  { stufe:15, frage:'Wer erhielt 1901 den ersten Nobelpreis für Physik?', antworten:['Max Planck','Albert Einstein','Marie Curie','Wilhelm Conrad Röntgen'], richtig:3 },
  { stufe:15, frage:'Welcher Mathematiker bewies in den 1990er-Jahren den Großen Fermatschen Satz?', antworten:['Andrew Wiles','Grigori Perelman','Terence Tao','John Nash'], richtig:0 },
  { stufe:15, frage:'Welcher ist der tiefste See der Erde?', antworten:['Tanganjikasee','Kaspisches Meer','Baikalsee','Oberer See'], richtig:2 },
];
