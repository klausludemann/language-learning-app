import type { Dialogue } from "../types";

export const DIALOGUES: Dialogue[] = [
  {
    id: "d-restaurant-1",
    topic: "restaurant",
    title: "Im Restaurant bestellen",
    lines: [
      { speaker: "A", es: "Buenas noches. ¿Una mesa para dos?", de: "Guten Abend. Einen Tisch für zwei?" },
      { speaker: "B", es: "Sí, por favor. ¿Nos trae la carta?", de: "Ja, bitte. Bringen Sie uns die Karte?" },
      { speaker: "A", es: "Por supuesto. ¿Algo para beber?", de: "Selbstverständlich. Etwas zu trinken?" },
      { speaker: "B", es: "Una copa de vino tinto y agua sin gas, por favor.", de: "Ein Glas Rotwein und Wasser ohne Kohlensäure, bitte." },
      { speaker: "A", es: "¿Qué desean comer?", de: "Was möchten Sie essen?" },
      { speaker: "B", es: "¿Qué recomienda?", de: "Was empfehlen Sie?" },
    ],
  },
  {
    id: "d-hotel-1",
    topic: "hotel",
    title: "Check-in im Hotel",
    lines: [
      { speaker: "A", es: "Hola, tengo una reserva a nombre de Müller.", de: "Hallo, ich habe eine Reservierung auf den Namen Müller." },
      { speaker: "B", es: "Bienvenido. ¿Su pasaporte, por favor?", de: "Willkommen. Ihren Pass, bitte?" },
      { speaker: "A", es: "Aquí tiene. ¿A qué hora es el desayuno?", de: "Hier, bitte. Wann gibt es Frühstück?" },
      { speaker: "B", es: "De siete a diez. Su habitación es la 203.", de: "Von sieben bis zehn. Ihr Zimmer ist die 203." },
    ],
  },
  {
    id: "d-verkehr-1",
    topic: "verkehr",
    title: "Nach dem Weg fragen",
    lines: [
      { speaker: "A", es: "Perdón, ¿dónde está la estación de tren?", de: "Entschuldigung, wo ist der Bahnhof?" },
      { speaker: "B", es: "Todo recto y luego a la derecha.", de: "Geradeaus und dann rechts." },
      { speaker: "A", es: "¿Está lejos?", de: "Ist es weit?" },
      { speaker: "B", es: "Diez minutos a pie.", de: "Zehn Minuten zu Fuß." },
      { speaker: "A", es: "Muchas gracias.", de: "Vielen Dank." },
    ],
  },
  {
    id: "d-camping-1",
    topic: "camping",
    title: "An der Campingplatz-Rezeption",
    lines: [
      { speaker: "A", es: "Buenos días. ¿Tienen una parcela libre para esta noche?", de: "Guten Tag. Haben Sie heute Nacht einen Stellplatz frei?" },
      { speaker: "B", es: "Sí. ¿Con tienda o caravana?", de: "Ja. Mit Zelt oder Wohnwagen?" },
      { speaker: "A", es: "Con tienda. ¿Hay toma de corriente?", de: "Mit Zelt. Gibt es einen Stromanschluss?" },
      { speaker: "B", es: "Sí, son veinte euros por noche.", de: "Ja, es sind zwanzig Euro pro Nacht." },
    ],
  },
  {
    id: "d-wandern-1",
    topic: "wandern",
    title: "Auskunft zur Wanderung",
    lines: [
      { speaker: "A", es: "Hola, ¿cuánto dura esta ruta?", de: "Hallo, wie lange dauert diese Route?" },
      { speaker: "B", es: "Unas cuatro horas, ida y vuelta.", de: "Etwa vier Stunden, hin und zurück." },
      { speaker: "A", es: "¿Está bien señalizado?", de: "Ist sie gut ausgeschildert?" },
      { speaker: "B", es: "Sí, con marcas rojas y blancas.", de: "Ja, mit roten und weißen Markierungen." },
      { speaker: "A", es: "¿Y el tiempo hoy?", de: "Und wie ist das Wetter heute?" },
      { speaker: "B", es: "Por la tarde puede llover. Lleve un chubasquero.", de: "Am Nachmittag kann es regnen. Nehmen Sie eine Regenjacke mit." },
    ],
  },
  {
    id: "d-radfahren-1",
    topic: "radfahren",
    title: "Fahrrad mieten",
    lines: [
      { speaker: "A", es: "Buenos días, quiero alquilar una bicicleta.", de: "Guten Tag, ich möchte ein Fahrrad mieten." },
      { speaker: "B", es: "¿Por cuánto tiempo?", de: "Für wie lange?" },
      { speaker: "A", es: "Por un día. ¿Incluye casco?", de: "Für einen Tag. Ist ein Helm dabei?" },
      { speaker: "B", es: "Sí, casco y candado están incluidos.", de: "Ja, Helm und Schloss sind inklusive." },
    ],
  },
];
