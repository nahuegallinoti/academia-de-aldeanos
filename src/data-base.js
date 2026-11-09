const RES=[['food','Comida'],['wood','Madera'],['gold','Oro'],['stone','Piedra']];
const LESSONS=[
{t:'El motor: el Centro Urbano nunca para',why:'Cada aldeano tarda 25 segundos. Si el CU queda quieto 25 segundos perdiste un aldeano y todo lo que ese aldeano iba a juntar en la partida. La mayoría de las partidas de nivel bajo se deciden acá.',keys:['Encolá de a uno o dos: el costo se descuenta al encolar y acumular cola te frena.','Hacé una casa antes de llegar al tope. Cada casa da 5 de población.','Mientras investigás una edad el CU no entrena. Por eso cada apertura define con cuántos aldeanos hacés clic.','Asigná un botón a "aldeano ocioso" y tocalo seguido.','En partidas largas apuntá a 100 a 130 aldeanos.'],drill:'Arabia contra IA Moderada, sin pelear. Llegá a 30 aldeanos sin que el CU pare.',done:'Tres partidas seguidas con el CU sin parar hasta la Edad Feudal.',link:['aperturas','Ver el orden completo']},
{t:'La apertura universal',why:'Casi todas las aperturas empiezan igual: ovejas, madera, jabalí, bayas. Una vez que esto sale solo, las variantes son cambios chicos al final.',keys:['6 aldeanos en ovejas, de a una por vez bajo el CU.','Los siguientes 3 o 4 van a madera con un campamento maderero.','Un aldeano atrae al jabalí: lo golpea y corre al CU. Los pastores lo rematan cuando llega.','Molino junto a las bayas y 4 aldeanos ahí.','Mientras tanto el explorador busca más ovejas, jabalíes, oro y piedra.'],drill:'Usá Arqueros 22 en modo reloj, con la app abierta al lado.',done:'Clic Feudal antes de 9:30 dos veces.',link:['aperturas','Abrir Arqueros 22']},
{t:'Economía en Feudal: mejoras y granjas',why:'Al llegar a Feudal se acaba la comida natural. La transición a granjas y las mejoras son lo que separa un Feudal sano de uno que se estanca.',keys:['Investigá primero Hacha de doble filo (madera), después Collar de caballo (granjas), después Carretilla.','Cada granja cuesta 60 de madera. Si no te alcanza, tenés pocos leñadores.','Dejá 6 o más granjas listas antes de que se acaben bayas y ovejas.','Regla práctica: si te sobra un recurso, mové aldeanos. Los recursos acumulados no pelean.'],drill:'Repetí tu apertura y anotá cuándo te quedaste sin comida natural.',done:'Llegás a Castillos sin ningún momento con menos de 8 granjas y el CU parado.',link:['ayuda','Ver problemas comunes']},
{t:'Counters: el triángulo y las unidades baratas',why:'Pelear con la unidad correcta vale más que tener más unidades. Hay un triángulo central y dos contras que cuestan poco o nada de oro.',keys:['Caballería gana a arqueros. Arqueros ganan a infantería. Lanceros ganan a caballería.','Hostigadores anulan arqueros y no usan oro.','Camellos frenan caballería pesada.','Una unidad principal más un complemento gana a una masa de un solo tipo.'],drill:'Hacé 15 preguntas seguidas en Entrenar. Después, en una partida, mirá los edificios rivales antes de elegir unidad.',done:'Respondés bien 8 de 10 en Entrenar.',link:['counters','Abrir counters']},
{t:'Elegí tu primera apertura real',why:'Conviene dominar una o dos aperturas antes de probar otras. Scouts y Arqueros son las más rendidoras en Arabia.',keys:['Exploradores: presión temprana y control del mapa. Buena con civs de caballería.','Arqueros: daño a distancia, castiga al que no los enfrente con caballería o hostigadores.','Fast Castle: te saltás casi toda Feudal para llegar antes a caballeros o a un boom. Es arriesgada si te presionan.','Si recién empezás, jugá Francos con Scouts o Britanos con Arqueros durante un tiempo.'],drill:'Diez partidas con la misma civ y la misma apertura. Registrá el clic Feudal en la app.',done:'Te sale la apertura sin mirar y tu clic Feudal llega al nivel D.',link:['aperturas','Comparar aperturas']},
{t:'Defensa y micro mínima',why:'Perder 6 aldeanos en Feudal te cuesta más que cualquier mejora. Con pocas herramientas se resuelve la mayor parte de los ataques.',keys:['Investigá Telar antes de que lleguen los primeros ataques: los aldeanos aguantan más.','Si te atacan, tocá la campana del pueblo y guarecé aldeanos en CU y torres.','Amurallá con empalizadas los puntos abiertos cuando veas que el rival va agresivo.','Atacá donde están sus aldeanos, no su ejército. Si pierde aldeanos, ganaste el intercambio.'],drill:'Pedí a un amigo o a la IA Difícil que te presione temprano. Practicá guarecer y volver a trabajar rápido.',done:'Sobreviviste un rush sin perder más de 3 aldeanos.',link:['ayuda','Qué hacer si me rushean']},
{t:'Edad de los Castillos: boom o presión',why:'Es la decisión estratégica más grande. O invertís en más CU para ganar a largo plazo, o usás tu ventaja para pegar ahora.',keys:['Boom: 2 CU adicionales y aldeanos sin parar. Paga fuerte en Imperial.','Presión: caballeros o ballesteros con mejoras, atacando la economía rival.','Conseguí reliquias: dan oro para siempre y solo los monjes las recogen.','Ariete y Mangana rompen edificios y formaciones. Sin asedio no se cierran partidas.'],drill:'Probá la apertura Fast Castle en sus dos finales: Caballeros y Boom.',done:'Llegás a 30 granjas y clic Imperial antes del minuto 30 en un boom sin presión.',link:['aperturas','Abrir Fast Castle']},
{t:'Imperial y cierre de partida',why:'En Imperial la partida se decide por mejoras completas, posición y por quién administra mejor el oro.',keys:['Completá la herrería de tu unidad principal antes de meter más variedad.','Cuando se acaba el oro, entran las unidades baratas: lanceros, hostigadores y caballería ligera.','Comercio y reliquias mantienen oro cuando las minas se terminan.','Los trabuquetes derriban castillos a distancia. Protegelos.'],drill:'Jugá contra IA Muy Difícil y llevá la partida hasta Imperial al menos tres veces.',done:'Cerrás una partida destruyendo edificios, sin esperar a que el rival renuncie.',link:['counters','Ver qué usar sin oro']},
{t:'Tu civ principal',why:'Conocer una civ a fondo te enseña más que probar todas. Cuando sabés lo que tu civ hace bien, cada decisión se simplifica.',keys:['Mirá su árbol de tecnología dentro del juego: te dice qué unidades tienen mejoras completas.','Aprendé su bonus de economía y cómo cambia tu apertura.','Elegí una segunda civ para los mapas donde tu principal sufre.'],drill:'Filtrá por "Para empezar" en Civilizaciones y elegí una. Jugá 20 partidas con ella.',done:'Podés explicar en dos frases cómo ganás con tu civ.',link:['civs','Elegir civilización']}
];
const FEU='Feudal',DA='Edad Oscura',CA='Castillos',IM='Imperial';
const OP=[
['0:00',3,DA,'Encolá aldeanos. Tus 3 aldeanos iniciales hacen 2 casas y después van a las ovejas.','Mandá el explorador a buscar ovejas.',[3,0,0,0]],
];
const BUILDS=[
{id:'scouts',name:'Exploradores 21',en:'21 pop Scouts',tag:'Presión con caballería',civs:'Francos, Magiares, Hunos, Lituanos, Berbers',when:'Mapas abiertos como Arabia, sobre todo si el rival juega pasivo o tiene pocos counters a mano.',risk:'Si el rival hace lanceros temprano, tus exploradores no pelean y tenés que pasar a arqueros o a Castillos.',source:'Pasos y tiempos adaptados de Build Order Reference.',
bench:{h:['Hito','A+','A','B','C','D','E'],r:[['Clic Feudal (21 pop)','7:35','7:45','7:55','8:10','8:35','9:05'],['6 exploradores','13:05','13:20','13:35','13:55','14:25','15:05'],['Clic Castillos','16:30','16:55','17:20','17:50','18:20','19:00']]},
steps:[...OP,
['1:15',6,DA,'Los 3 aldeanos nuevos van a las ovejas. Tenés 6 comiendo.','No dejes que se separen de la zona del CU.',[6,0,0,0]],
['2:30',9,DA,'Los siguientes 3 van a madera: construyen campamento maderero.','Elegí el bosque más cercano y compacto.',[6,3,0,0]],
['2:55',10,DA,'Un aldeano atrae al primer jabalí.','Pegale y corré hacia el CU, donde están los pastores.',[7,3,0,0]],
['3:20',11,DA,'Otro aldeano a las ovejas.','',[8,3,0,0]],
['5:00',15,DA,'Los siguientes 4 van a las bayas y construyen molino.','Un aldeano hace el molino, los demás recogen.',[12,3,0,0]],
['5:50',17,DA,'Dos más al jabalí.','Atraé el segundo jabalí cuando termine el primero.',[14,3,0,0]],
['7:30',21,DA,'Pasá gente de comida a madera: unos 10 en madera, con segundo campamento.','Telar si te falta seguridad. Hacé 2 granjas si ya se acaban ovejas y jabalí.',[11,10,0,0]],
['7:35',21,DA,'Clic Edad Feudal. Con un aldeano construí un cuartel durante la investigación.','El CU no entrena hasta que termine.',[11,10,0,0]],
['9:45',21,FEU,'Llegaste a Feudal. Construí establo y hacé exploradores sin parar.','Atacá aldeanos, evitá pelear contra lanceros.',[11,10,0,0]],
['10:30',23,FEU,'Investigá Hacha de doble filo y Collar de caballo. Seguí sumando granjas.','',[13,10,0,0]],
['12:30',27,FEU,'Mandá 5 aldeanos a oro y pasá gente de bayas a granjas.','Apuntá a unas 14 granjas.',[12,10,5,0]],
['13:05',29,FEU,'Objetivo: 6 exploradores.','Investigá Bloodlines si van a seguir peleando.',[14,10,5,0]],
['14:30',32,FEU,'Carretilla y herrería.','',[15,11,6,0]],
['16:30',37,CA,'Clic Edad de los Castillos.','Definí si vas a Caballeros o a arqueros según lo que tenga el rival.',[19,12,6,0]]
]},
{id:'archers',name:'Arqueros 22',en:'22 pop Archers',tag:'Daño a distancia',civs:'Britanos, Etíopes, Mayas, Italianos, Vietnamitas',when:'Mapas abiertos cuando querés pelear a distancia y castigar infantería. Va bien contra el que hace pocos hostigadores.',risk:'Dependés del oro temprano. Si te llegan con exploradores sobre las minas, perdés el tempo.',source:'Pasos y tiempos adaptados de Build Order Reference.',
bench:{h:['Hito','A+','A','B','C','D','E'],r:[['Clic Feudal (22 pop)','8:00','8:10','8:20','8:35','9:00','9:30'],['6 arqueros + Fletching','13:05','13:25','13:50','14:20','14:45','15:20'],['Clic Castillos con 24 arqueros','19:00','19:30','20:00','20:30','21:10','22:00']]},
steps:[...OP,
['1:15',6,DA,'6 aldeanos en ovejas.','',[6,0,0,0]],
['2:55',10,DA,'Los siguientes 4 van a madera con campamento.','',[6,4,0,0]],
['3:20',11,DA,'Un aldeano atrae al jabalí.','Lo rematan los pastores junto al CU.',[7,4,0,0]],
['5:00',15,DA,'Los siguientes 4 van a bayas y hacen molino.','',[11,4,0,0]],
['5:50',17,DA,'Dos más al jabalí. Atraé el segundo.','',[13,4,0,0]],
['7:05',20,DA,'El resto va a madera y hace segundo campamento.','',[13,7,0,0]],
['8:00',22,DA,'Clic Feudal. Reparto: 11 madera y 3 oro.','Telar si te van a presionar. Con un aldeano hacé el cuartel durante la investigación.',[8,11,3,0]],
['10:10',22,FEU,'Llegaste a Feudal. Construí 2 campos de arqueros y entrená sin parar.','',[8,11,3,0]],
['11:00',24,FEU,'Investigá Hacha de doble filo. Más gente al oro.','',[8,11,5,0]],
['12:15',27,FEU,'Llegá a 8 en oro.','',[8,11,8,0]],
['13:05',29,FEU,'Herrería y Fletching. Empezá granjas.','Objetivo: 6 arqueros con Fletching.',[10,11,8,0]],
['14:30',33,FEU,'Carretilla. Más aldeanos a madera y granjas.','',[13,12,8,0]],
['19:00',40,CA,'Clic Castillos con unos 24 arqueros.','Un buen arquero con mejoras hace mucho daño: cuidalo.',[19,13,8,0]]
]},
{id:'maa',name:'Hombres de armas + Arqueros',en:'22 pop MAA Archers',tag:'Pelea temprana y arqueros',civs:'Vikingos, Aztecas, Japoneses, Godos',when:'Cuando querés entrar primero al mapa y castigar a quien todavía no tiene unidades.',risk:'Exige economía limpia. Si te sale desordenada, llegás tarde a todo.',source:'Pasos y tiempos adaptados de Build Order Reference.',
bench:{h:['Hito','A+','A','B','C','D','E'],r:[['Clic Feudal (22 pop)','8:00','8:10','8:20','8:35','9:00','9:30'],['3 hombres de armas','11:00','11:10','11:25','11:40','12:10','12:45'],['5 arqueros + Fletching','14:20','14:40','15:05','15:30','16:00','16:35'],['Clic Castillos con 10 arqueros','17:45','18:15','18:45','19:15','19:55','20:45']]},
steps:[...OP,
['1:15',6,DA,'6 aldeanos en ovejas.','',[6,0,0,0]],
['2:55',10,DA,'4 en madera con campamento.','',[6,4,0,0]],
['3:20',11,DA,'Un aldeano atrae al jabalí.','',[7,4,0,0]],
['5:00',15,DA,'4 a bayas y molino.','',[11,4,0,0]],
['5:50',17,DA,'Dos más al jabalí.','',[13,4,0,0]],
['6:15',18,DA,'Uno más a madera.','',[13,5,0,0]],
['6:40',19,DA,'Un aldeano construye cuartel.','',[14,5,0,0]],
['7:30',21,DA,'Dos aldeanos a oro. Investigá Telar.','',[14,5,2,0]],
['8:00',22,DA,'Clic Feudal. Pasá gente a madera hasta 8 y hacé segundo campamento.','Durante la investigación: 3 milicias y 2 granjas.',[12,8,2,0]],
['10:10',22,FEU,'Investigá Hombres de armas y Hacha de doble filo. Construí un campo de arqueros.','Mandá los 3 hombres de armas a molestar.',[12,8,2,0]],
['11:00',24,FEU,'Objetivo: 3 hombres de armas en su base. Dos a madera (10).','Pasá pastores a granjas.',[12,10,2,0]],
['12:15',27,FEU,'Cinco en oro. Arqueros sin parar.','',[12,10,5,0]],
['14:20',32,FEU,'Unas 6 granjas, herrería y Fletching.','Objetivo: 5 arqueros con Fletching.',[17,10,5,0]],
['16:00',36,FEU,'Carretilla y +3 a oro (8). Segundo campo de arqueros.','Más granjas antes del segundo campo mejora tu Castillos.',[18,10,8,0]],
['17:45',40,CA,'Clic Castillos con 10 arqueros.','',[22,10,8,0]]
]},
{id:'fck',name:'Fast Castle: Caballeros',en:'FC Knights',tag:'Llegar antes a caballeros',civs:'Francos, Persas, Borgoñones, Teutones',when:'Mapas más cerrados o cuando el rival no te va a presionar en Feudal.',risk:'Casi no tenés unidades en Feudal. Un rush bien hecho te castiga fuerte.',source:'Pasos adaptados de Age of Notes. La fuente pide 27 pop alrededor de 10:00; el resto de los tiempos son estimados.',
steps:[...OP,
['1:40',7,DA,'6 aldeanos en ovejas.','',[7,0,0,0]],
['2:05',8,DA,'Un aldeano construye campamento maderero.','',[7,1,0,0]],
['3:20',11,DA,'Tres más a madera: 4 leñadores.','',[7,4,0,0]],
['3:45',12,DA,'Un aldeano atrae el primer jabalí. Los pastores van al jabalí.','',[8,4,0,0]],
['4:10',13,DA,'Un aldeano hace 2 casas.','',[9,4,0,0]],
['4:35',14,DA,'Un aldeano hace molino en las bayas y se queda recogiendo.','',[10,4,0,0]],
['5:00',15,DA,'Otro a las bayas.','',[11,4,0,0]],
['5:25',16,DA,'Un aldeano atrae el segundo jabalí.','',[12,4,0,0]],
['6:15',18,DA,'Dos más a las bayas: 4 recolectores. Quienes cazan vuelven a las ovejas.','Un pastor herido hace la primera granja.',[14,4,0,0]],
['6:40',19,DA,'Dos a las ovejas.','',[15,4,0,0]],
['7:05',20,DA,'Un leñador hace el segundo campamento.','',[15,5,0,0]],
['8:20',23,DA,'Tres a madera, un pastor hace la segunda granja. Una casa.','',[15,8,0,0]],
['9:10',25,DA,'Dos a madera: 10 leñadores. Hacé 2 granjas más (4).','',[15,10,0,0]],
['9:35',26,DA,'Un aldeano hace campamento minero en oro.','',[15,10,1,0]],
['10:00',27,DA,'Dos a oro, Telar, 2 pastores a oro (4). Dos granjas más (6).','',[13,10,4,0]],
['10:25',27,DA,'Clic Feudal.','Reparto: 10 leñadores, 4 recolectores, 6 granjas, 4 en oro.',[13,10,4,0]],
['11:40',27,DA,'Con 50-60% de investigación, construí un cuartel adelantado.','',[13,10,4,0]],
['12:35',27,FEU,'Llegaste a Feudal. Los próximos 2 aldeanos van a oro. Herrería y establo con leñadores.','',[13,10,4,0]],
['13:30',29,FEU,'Clic Castillos. Investigá mejoras de granja y madera.','',[13,10,6,0]],
['14:30',29,FEU,'Con 175 de madera, segundo establo. Mejora de oro.','Cada 60 de madera, un leñador hace una granja nueva.',[15,8,6,0]],
['16:10',29,CA,'Llegaste a Castillos. Caballeros sin parar en ambos establos.','Aldeanos de a uno, para que no falte comida para caballeros.',[15,8,6,0]],
['18:00',34,CA,'Recolectores terminados pasan a granjas. Aldeanos nuevos al oro hasta 14.','Atacá la economía: entrá, matá y salí.',[17,8,9,0]],
['21:00',45,CA,'Mantené la producción. Agregá piqueros si hace camellos o lanceros.','',[22,9,14,0]]
]},
{id:'boom',name:'Fast Castle: Boom 3 CU',en:'FC Boom',tag:'Economía para Imperial',civs:'Teutones, Bizantinos, Persas, Chinos, Vikingos',when:'Mapas seguros o si el rival no puede romper tus defensas temprano.',risk:'Muy castigable. Si llegan caballeros a tus aldeanos sin unidades, perdés todo.',source:'Pasos adaptados de Age of Notes. Tiempos de Castillos en adelante según la misma fuente.',
steps:[
['0:00',3,DA,'Mismo inicio que Fast Castle: Caballeros hasta llegar a Castillos.','Abrí esa apertura para ver el detalle de Edad Oscura y Feudal.',[3,0,0,0]],
['10:25',27,DA,'Clic Feudal con 10 leñadores, 4 recolectores, 6 granjas y 4 en oro.','',[13,10,4,0]],
['13:30',29,FEU,'Clic Castillos. Investigá mejoras de granja y madera.','',[13,10,6,0]],
['16:10',29,CA,'Llegaste a Castillos. Entrená 4 caballeros y atacá unos 3 minutos.','Solo para ganar tiempo y molestar.',[15,8,6,0]],
['16:40',31,CA,'Investigá Sierra de arco. Aldeanos sin parar, todos a madera.','',[15,10,6,0]],
['17:30',33,CA,'Con 275 de madera, construí un Centro Urbano. Objetivo: 3 CU.','',[15,12,6,0]],
['19:00',40,CA,'Todos los CU a madera. Cada 60 de madera, una granja.','',[20,14,6,0]],
['20:00',48,CA,'Carretilla si todavía no la tenés. Un CU pasa a oro.','Producí caballeros solo si te amenazan.',[25,15,8,0]],
['26:00',85,CA,'Objetivo: 30 granjas. Investigá Carro de mano con 300 comida y 200 madera.','',[34,28,18,5]],
['28:30',98,IM,'Clic Imperial. Investigá Arado pesado.','Construí edificios militares según el rival.',[38,32,22,6]]
]}
];
BUILDS.forEach(b=>{b.steps=b.steps.map(s=>({t:parseT(s[0]),pop:s[1],age:s[2],do:s[3],note:s[4],a:s[5]}))});
function parseT(s){const m=String(s).trim().match(/^(\d{1,3})[:.,](\d{2})$/);if(!m)return null;return +m[1]*60+ +m[2]}
function fmtT(n){n=Math.max(0,Math.floor(n));return Math.floor(n/60)+':'+String(n%60).padStart(2,'0')}
const U=[
{id:'scout',n:'Explorador',en:'Scout',age:'Feudal',cost:'Solo comida',beats:['archer','skirm','monk'],loses:['spear','camel','knight'],why:'Barato y veloz. Sirve para matar aldeanos y arqueros sueltos.'},
{id:'knight',n:'Caballero',en:'Knight',age:'Castillos',cost:'Comida y oro',beats:['archer','skirm','mangonel','treb'],loses:['spear','camel','monk'],why:'La unidad más segura de Castillos. Cae rápido ante picas.'},
{id:'archer',n:'Arquero / Ballestero',en:'Archer',age:'Feudal',cost:'Madera y oro',beats:['maa','spear'],loses:['skirm','knight','mangonel','scout'],why:'Hace daño sin que lo toquen, pero necesita distancia.'},
{id:'skirm',n:'Hostigador',en:'Skirmisher',age:'Feudal',cost:'Comida y madera',beats:['archer','ca'],loses:['knight','scout','maa'],why:'Sin oro. Aguanta flechas y castiga a los arqueros.'},
{id:'spear',n:'Lancero / Piquero',en:'Spearman',age:'Feudal',cost:'Comida y madera',beats:['scout','knight','camel','eleph'],loses:['archer','maa','mangonel'],why:'Sin oro y con bonus enorme contra todo lo montado.'},
{id:'maa',n:'Hombre de armas',en:'Man-at-Arms',age:'Feudal',cost:'Comida y oro',beats:['spear','eagle','ram'],loses:['archer','hc','knight'],why:'Temprano pega fuerte. Los arqueros lo castigan a distancia.'},
{id:'camel',n:'Camello',en:'Camel Rider',age:'Castillos',cost:'Comida y oro',beats:['knight','scout','eleph'],loses:['spear','maa','archer'],why:'Hecho para cazar caballería.'},
{id:'ca',n:'Arquero a caballo',en:'Cavalry Archer',age:'Castillos',cost:'Madera y oro',beats:['maa','spear','mangonel'],loses:['skirm','knight','camel'],why:'Pega y se aleja. Requiere masa y micro.'},
{id:'monk',n:'Monje',en:'Monk',age:'Castillos',cost:'Oro',beats:['knight','eleph'],loses:['scout','eagle','ca'],why:'Convierte unidades caras. Muy frágil si lo alcanzan.'},
{id:'mangonel',n:'Mangana',en:'Mangonel',age:'Castillos',cost:'Madera y oro',beats:['archer','spear','skirm'],loses:['knight','scout','eagle','bombard'],why:'Daño en área contra masas. Puede dañar a tus propias tropas.'},
{id:'ram',n:'Ariete',en:'Ram',age:'Castillos',cost:'Madera y oro',beats:[],vs:'Edificios',loses:['maa','spear','knight'],why:'Casi inmune a flechas. Las unidades melee lo destruyen.'},
{id:'treb',n:'Trabuquete',en:'Trebuchet',age:'Imperial',cost:'Madera y oro',beats:[],vs:'Castillos y edificios a distancia',loses:['knight','scout','bombard'],why:'Tira desde lejos. Mandá caballería a buscarlo.'},
{id:'eleph',n:'Elefante de guerra',en:'Battle Elephant',age:'Castillos',cost:'Comida y oro',beats:['maa','scout'],vs:'Edificios',loses:['spear','camel','monk'],why:'Mucha vida y lento. Picas y monjes lo frenan.'},
{id:'eagle',n:'Guerrero Águila',en:'Eagle Warrior',age:'Castillos',cost:'Comida y oro',beats:['monk','mangonel','archer','ram'],loses:['maa','knight','scout'],why:'Rápido y resistente a flechas. La línea de milicia le gana.'},
{id:'hc',n:'Cañón de mano',en:'Hand Cannoneer',age:'Imperial',cost:'Comida y oro',beats:['maa','spear','eagle'],loses:['knight','scout','bombard'],why:'Destroza infantería. Lento para recargar.'},
{id:'bombard',n:'Cañón de bombardeo',en:'Bombard Cannon',age:'Imperial',cost:'Madera y oro',beats:['mangonel','treb','ram'],vs:'Edificios',loses:['knight','scout'],why:'Largo alcance contra asedio y edificios.'}
];
const ub=Object.fromEntries(U.map(u=>[u.id,u]));

const MAPS=[
{n:'Arabia',t:'Terreno abierto, bosques dispersos. Es el mapa por defecto de los torneos y del ranked.',plan:'Exploradores, Arqueros o Hombres de armas. Hay peleas desde Feudal. Amurallá lo que puedas y vigilá tus aldeanos en oro y bayas.',c:'Para empezar',f:'lvl1',k:['Arabia']},
{n:'Arena',t:'Base rodeada por murallas de piedra. Casi nadie te toca en Feudal.',plan:'Fast Castle, monjes con asedio o boom de varios CU. La partida se juega en Castillos e Imperial.',c:'Monjes',f:'monk',k:['Arena']},
{n:'Selva Negra',t:'Bosques densos que separan a los jugadores. Hay pocos pasos.',plan:'Economía tranquila y trabuquetes para abrir caminos. Partidas largas donde importa la Imperial.',c:'Infantería',f:'inf',k:['Selva Negra']},
{n:'Nómada',t:'Empezás sin Centro Urbano: vos elegís dónde fundarlo.',plan:'Explorá con los aldeanos, elegí un lugar con madera, comida y oro cerca. El inicio es más caótico y tu ubicación cambia todo.',c:'Caballería',f:'cav',k:['Nómada']},
{n:'Islas',t:'Cada jugador en su isla. Sin barcos no hay partida.',plan:'Muelles, pesqueros y galeras desde temprano. El control del agua decide quién come y quién puede atacar.',c:'Naval',f:'naval',k:['Islas']},
{n:'Mapas híbridos',t:'Agua en el centro y tierra alrededor.',plan:'Podés abrir con 3 pesqueros para sumar comida rápido. Tenés que pelear por el agua sin descuidar la tierra.',c:'Naval',f:'naval',k:['Mapas híbridos','Islas']}
];
const PROBLEMS=[
['Llego tarde a Feudal',['CU quieto: revisá la cola y las casas.','El jabalí no llegó o se alejó: atraelo y volvé de inmediato al CU.','Aldeanos ociosos: tocá el botón de aldeano ocioso cada 20 segundos.','Compará tu clic con la tabla de la apertura.']],
['Me rushearon y perdí los aldeanos',['Tocá la campana y guarecé aldeanos en CU y torres.','Investigá Telar antes de que llegue el ataque.','Hacé lanceros contra caballería y hostigadores contra arqueros.','Empalizadas en los accesos abiertos, sobre todo junto a oro.']],
['Tengo muchos recursos sin usar',['Falta producción: construí más edificios militares o CU.','Te sobra uno: mové aldeanos al que te falta.','Vendé en el mercado solo como último recurso.']],
['Su ejército siempre le gana al mío',['Mirá su composición y buscala en Counters.','Investigá las mejoras de herrería antes de sumar unidades.','Peleá cerca de tus castillos, CU y torres.']],
['Me quedo sin oro en Imperial',['Sacá minas con carro de mano y expandí a nuevas minas temprano.','Pasá a comercio con Mercado y comerciantes.','Armá ejército barato: lanceros, hostigadores y caballería ligera.','Conseguí reliquias en Castillos.']],
['No puedo romper su base',['Sumá arietes a tu ejército en Castillos.','Trabuquetes en Imperial contra castillos.','Mangana contra arqueros que defienden.','Atacá por donde no hay castillo.']],
['Gano Castillos pero pierdo en Imperial',['Tu rival hizo boom: presioná su economía para frenarlo.','Comprá mejoras clave antes del clic Imperial.','Seguí haciendo aldeanos hasta llegar al objetivo.']],
['Mi ejército se muere y no sé por qué',['Mirá la barra de vida al pelear: un rival con mejoras pega más.','Evitá dividir el ejército en grupos chicos.','Sacá arqueros y asedio de la primera línea.']]
];
const GLOSS=[['Boom','Invertir en aldeanos y CU extra para ganar a largo plazo.'],['Rush','Ataque temprano para frenar al rival.'],['Drush','Rush de milicias en Edad Oscura.'],['Flush','Rush de Feudal con arqueros o exploradores.'],['Fast Castle (FC)','Pasar rápido por Feudal para llegar a Castillos.'],['Pop','Población actual.'],['House-block','Quedarte sin población por no hacer casas.'],['Idle','Aldeano o edificio sin trabajar.'],['Eco','Economía.'],['Macro','Gestión general: economía y producción.'],['Micro','Control fino de cada unidad.'],['Trash','Unidades sin oro: lanceros, hostigadores, caballería ligera.'],['Mass','Muchas unidades del mismo tipo.'],['Lure','Atraer un jabalí hacia el CU.'],['Quickwall','Amurallar rápido con empalizadas.'],['Raid','Ataque a la economía rival.'],['Xbow','Ballestero.'],['MAA','Hombre de armas.'],['Treb','Trabuquete.'],['UU','Unidad única de la civ.'],['UT','Tecnología única de la civ.'],['Forward','Edificio construido cerca del rival.'],['Float','Acumular recursos sin gastarlos.'],['Flank / Pocket','Posiciones de borde y centro en equipos.']];
const QBANK=[
{q:'¿Cada cuánto entrena un aldeano el Centro Urbano?',a:'25 segundos',o:['15 segundos','40 segundos','1 minuto'],x:'Por eso cada 25 segundos de CU parado es un aldeano menos.'},
{q:'Durante un avance de edad, ¿qué pasa con el CU?',a:'No entrena aldeanos',o:['Entrena el doble de rápido','Sigue igual','Se detiene el juego'],x:'Por eso importa con cuántos aldeanos hacés clic.'},
{q:'¿Qué significa boom?',a:'Sumar aldeanos y CU para ganar a largo plazo',o:['Atacar antes de Feudal','Construir solo torres','Hacer mucha caballería'],x:'Paga en Imperial.'},
{q:'¿Cuántos aldeanos suelen ir primero a las ovejas?',a:'6',o:['2','10','12'],x:'Es la base de casi todas las aperturas.'},
{q:'¿Qué aumenta directamente la madera en Feudal?',a:'Hacha de doble filo',o:['Telar','Carretilla','Arado pesado'],x:'Mejora el ritmo de los leñadores.'},
{q:'¿Qué unidad usás normalmente para atraer un jabalí al CU?',a:'Un aldeano',o:['Una milicia','Un arquero','Un monje'],x:'Pegale y volvé rápido al CU. Si se aleja perdés tiempo.'},
{q:'¿Cuánta madera cuesta una granja?',a:'60',o:['30','100','150'],x:'Por eso necesitás varios leñadores antes de la transición.'},
{q:'¿Qué significa Drush?',a:'Rush de milicias en Edad Oscura',o:['Boom de 3 CU','Rush con barcos','Llegar rápido a Imperial'],x:'Interrumpe la economía del rival temprano.'},
{q:'Clic Feudal a los 9:30 con Arqueros 22, ¿qué nivel es?',a:'E',o:['A+','B','C'],x:'Es un buen punto de partida. Las referencias van de A+ a E.'},
{q:'Tu rival juega Islas. ¿Qué es lo primero que debés armar?',a:'Muelles y pesqueros',o:['Solo torres','Establos','Casas extra'],x:'Sin agua no comés ni atacás.'},
{q:'Para romper un Castillo en Imperial, ¿qué conviene?',a:'Trabuquetes',o:['Hostigadores','Monjes','Exploradores'],x:'Tiran desde lejos.'},
{q:'Las unidades trash, ¿qué tienen en común?',a:'No usan oro',o:['Solo existen en Imperial','Son todas caballería','Solo se hacen en el CU'],x:'Se usan cuando el oro se termina.'}
];
const SOURCES=[['Age of Notes: guía de las 56 civilizaciones','https://ageofnotes.com/beginners/age-of-empires-2-civilizations-complete-guide/'],['Age of Notes: build orders','https://ageofnotes.com/?p=1934'],['Build Order Reference: Scouts 21','https://johsaoe2debuildorderreference.site44.com/21-pop-scouts.html'],['Build Order Reference: Arqueros 22','https://johsaoe2debuildorderreference.site44.com/22-pop-archers.html'],['Build Order Reference: MAA + Arqueros','https://johsaoe2debuildorderreference.site44.com/22-pop-men-at-arms-archers.html'],['Guildorder: counters y composiciones','https://guildorder.com/games/aoe2/wiki/unit-counters-and-army-composition'],['Sitio oficial: The Viking Sagas','https://www.ageofempires.com/news/pre-order-age-of-empires-ii-definitive-edition-the-viking-sagas/'],['Sitio oficial: The Last Chieftains','https://www.ageofempires.com/news/pre-order-the-last-chieftains-aoeii-de/'],['Liquipedia: mapas','https://liquipedia.net/ageofempires/Maps']];
