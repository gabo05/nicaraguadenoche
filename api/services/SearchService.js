// api/services/EventService.js
var locations = 
[/*{
	text: "Atlántico Norte (RAAN)",
	value: "raan",
	end: true
},
{
	text: "Atlántico Sur (RAAS)",
	value: "raas",
	end: true
},
{
	text: "Boaco",
	value: "boaco",
	end: true
},
{
	text: "Carazo",
	value: "carazo",
	end: true
},
{
	text: "Chinandega",
	value: "chinandega",
	end: true
},
{
	text: "Chontales",
	value: "chontales",
	end: true
},
{
	text: "Estelí",
	value: "esteli",
	end: true
},
{
	text: "Granada",
	value: "granada",
	end: true
},
{
	text: "Jinotega",
	value: "jinotega",
	end: true
},
{
	text: "León",
	value: "leon",
	end: true
},
{
	text: "Madríz",
	value: "madriz",
	end: true
},*/
{
	text: "Managua",
	value: "managua",
	end: true
},
{
	text: "Masaya",
	value: "masaya",
	end: true
}/*,
{
	text: "Matagalpa",
	value: "matagalpa",
	end: true
},
{
	text: "Nueva Segovia",
	value: "nuevasegovia",
	end: true
},
{
	text: "Río San Juan",
	value: "riosanjuan",
	end: true
},
{
	text: "Rivas",
	value: "rivas",
	end: true
}*/];
var temp = [{
	name: "Re",
	shortdescription: "Excelente disco con buena musica",
	phone: "88888888",
	path: "re"
},
{
	name: "Jimmy Three Fingers",
	shortdescription: "Excelente comida",
	phone: "88888888",
	path: "jimmy-three-fingers"
},
{
	name: "Teatro Nacional Rubén Darío",
	shortdescription: "El mejor teatro de Nicaragua",
	phone: "88888888",
	path: "teatro-nacional-ruben-dario"
}];
module.exports = {

    /**
    * Get the five next events.
    *
    */
    getQuestions: function(){
		return new Promise(function(resolve, reject){
			var questions = {
				question: "¿Qué te gustaría hacer hoy?",
				options: [
					{
						text: "Salir a comer",
						value: "eat",
						question: "¿qué tipo de comida se te antoja?",
						options: [
							{
								text: "Comida Nacional",
								value: "national",
								question: "¿En qué departamento?",
								options: locations
							},
							{
								text: "Comida Rápida",
								value: "fast",
								question: "¿En qué departamento?",
								options: locations
							},
							{
								text: "Comida Extranjera",
								value: "foreign",
								question: "¿En qué departamento?",
								options: locations
							}
						]
					},
					{
						text: "Ir a un bar o una disco",
						value: "party",
						question: "¿Qué prefieres?",
						options: [
							{
								text: "Bailar",
								value: "dance",
								question: "¿En qué departamento?",
								options: locations
							},
							{
								text: "Solo tomar y conversar",
								value: "drink",
								question: "¿En qué departamento?",
								options: locations
							},
							{
								text: "Escuchar buena música",
								value: "listenmusic",
								question: "¿Qué tipo de música?",
								options: [
									{
										text: "Nacional",
										value: "national",
										question: "¿En qué departamento?",
										options: locations
									},
									{
										text: "Rock",
										value: "rock",
										question: "¿En qué departamento?",
										options: locations
									},
									{
										text: "Electrónica",
										value: "electronic",
										question: "¿En qué departamento?",
										options: locations
									},
									{
										text: "Salsa",
										value: "salsa",
										question: "¿En qué departamento?",
										options: locations
									},
									{
										text: "Reggaeton",
										value: "reggaeton",
										question: "¿En qué departamento?",
										options: locations
									}
								]
							}
						]
					},
					{
						text: "Algo cultural",
						value: "cultural",
						question: "¿Qué tipo de actividad?",
						options: [
							{
								text: "Ir al cine",
								value: "movies",
								question: "¿En qué departamento?",
								options: locations
							},
							{
								text: "Ir al teatro",
								value: "theater",
								question: "¿En qué departamento?",
								options: locations
							}
						]
					},
					{
						text: "Ir a un hotel",
						value: "hotel",
						question: "¿En qué departamento?",
						options: locations
					}
				]
			};
			resolve(questions);
		});
	},
	search: function(answers){
		return new Promise(function(resolve, reject){
			Place.native(function(err, collection) {
                if (err) return reject(err);
                collection.find({
                	filters: {
                		"$size": answers.length,
                		"$all": answers
                	}
                }).toArray(function (err, results) {
                    if (err) return reject(err);
                    return resolve(results);
                });
            });
		});
	}
}