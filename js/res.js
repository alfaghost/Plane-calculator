$(document).ready(function() {
	var p_url=location.search.substring(1);
	var parametr=p_url.split("&");
	var values= new Array();
	for(i in parametr) {
	    var j=parametr[i].split("=");
	    values[j[0]]=unescape(j[1]);
	}
	//конструкция
	var constrW = parseFloat(values["var1"]);
	//силовая установка
	var powerW = parseFloat(values["var2"]);
	//оборудование и управление
	var stuffW = parseFloat(values["var3"]);
	//топливо
	var fuelW = parseFloat(values["var4"]);
	//целевая и служебная наагрузки
	var wtfW = parseFloat(values["var5"]);
	//удельный расход топлива
	var fWaste = parseFloat(values["var6"]);
	//допустимая перегрузка
	var overload = parseFloat(values["var7"]);
	//количество двигателей
	var engs = parseFloat(values["var8"]);
	//Дальность полета
	var fRange = parseFloat(values["var9"]);
	//Высота полета
	var fHeights = parseFloat(values["var10"]);
	//Аэродинамическое качество
	var smth = parseFloat(values["var11"]);
	//Скорость
	var speed = parseFloat(values["var12"]);
	//Скорость захода на посадку
	var landingSpeed = parseFloat(values["var13"]);
	//Вертикальная скорость
	var vertSpeed = parseFloat(values["var14"]);
	//Скоростной напор
	var smthElse = parseFloat(values["var15"]);
	//Длина разбега
	var run = parseFloat(values["var16"]);
	//Коэффициент трения при взлете
	var fc = parseFloat(values["var17"]);
	//Коэффициент лобового сопротивления
	var resistanceC = parseFloat(values["var18"]);
	//Максимальное аэродинамиеское качество
	var maxAerodinamicQual = parseFloat(values["var19"]);
	//Аэродинамическое качество при взлете
	var startAerodinamicQual = parseFloat(values["var20"]);
	//Аэродинамическое качество при наборе высоты
	var anotherAerodinamicQual = parseFloat(values["var21"]);
	var tgt;
	switch(engs) {
		case 2: tgt = 0.024;
		case 3: tgt = 0.027;
		case 3: tgt = 0.030;
		default: tgt = 0;
	}
	var deltaSht;
	var M = speed / 340.29;
	var eps = 1 - 0.32*M + 0.4*M*M - 0.01*M*M*M;
	var poh = 0.8; //todo: узнать как считать
	if (fHeights < 11000)
		deltaSht = Math.pow((poh / 1.224999), 0.85);
	else
		deltaSht = 1.2 * (poh / 1.224999);

	//Results
	//топливо
	var resFuel = 1 - Math.pow(Math.E, -(((fRange / 1000) * fWaste) / (speed * smth))) + fuelW;
	$("#res1").text(fuelW);
	//Удельная нагрузка на крыло из условия посадки
	var resWingLandingLoad = (1.8 * landingSpeed * landingSpeed) / (30.2 - 30.26 * 0.6 * resFuel);
	$("#res2").text(resWingLandingLoad);
	//Удельная нагрузка на крыло из условия обеспечения заданной крейсерской скорости
	var resWingSpeedLoad = (0.71 * 1.8 * smthElse) / (3 - 0.6 * resFuel);
	$("#res3").text(resWingSpeedLoad);
	//Удельная нагрузка на крыло с учетом полета на допускаемых коэффициентах подъемной силы и эксплутационной перегрузки
	var resWingOverloadLoad = (1.8 * smthElse) / (overload * (1 - 0.6 * resFuel))
	$("#res4").text(resWingOverloadLoad);
	var po = Math.min(resWingLandingLoad, resWingSpeedLoad, resWingOverloadLoad);
	//Тяговооруженность при одном отказавшем двигателе
	var resTtwWithoutEng = 1.5 * (engs / (engs - 1)) * ((1 / anotherAerodinamicQual) + tgt);
	if (engs == 1) resTtwWithoutEng = 0;
	$("#res5").text(resTtwWithoutEng);
	//Тяговооруженность из условия обеспечения горизонтального полета
	var resTtwFromHorFly = 1 / (0.9 * maxAerodinamicQual * deltaSht * eps);
	$("#res6").text(resTtwFromHorFly);
	//Тяговооруженность из условия обеспечения заданной длинны разбега
	var resTtwFromRun = 1.05 * (((1.2*po) / (1.8 * run)) + 0.5 * (3*0.02 + (1 / startAerodinamicQual)))
	$("#res7").text(resTtwFromRun);
	//Тяговооруженность из условия заданной скороподъемности
	var resTtwFromSpeed = ((vertSpeed / speed) + (1 / maxAerodinamicQual)) * 1 / (deltaSht * eps);
	$("#res8").text(resTtwFromSpeed);
	//Тяговооруженность из условия заданной максимальной скорости на заданной высоте
	var resTtwFromHeightSpeed = (0.075 * smthElse) / (po * eps * deltaSht);
	var resTtwFromOverloads = (1 + overload) / (2 * overload * 0.9 * maxAerodinamicQual * eps * deltaSht);
	$("#res9").text(resTtwFromOverloads);
	//Тяговооруженность из условий полета с заданной установившейся эксплуатационной перегрузкой
	$("#res10").text(resTtwFromHeightSpeed);
	//Максимальная тяговооруженность
	var maxTtw = Math.max(resTtwFromOverloads, resTtwFromSpeed, resTtwFromRun, resTtwWithoutEng, resTtwFromHeightSpeed, resTtwFromHorFly);
	$("#res11").text(maxTtw);
	//Масса в первом приближении
	var resWeight = wtfW / (1 - constrW - powerW - stuffW - fuelW);
	$("#res12").text(resWeight);
	var resttw = maxTtw * resWeight * 9.8/10;
	//Площадь крыла
	var resWingSquare = resWeight * 9.8 / (10 * po);
	$("#res13").text(resWingSquare);
	$("#res14").text(resttw);
});