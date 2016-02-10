$(document).ready(function() {
	calcWeight();
	$("#launch").click(function() {
		//конструкция
		var constrW = parseFloat($("#var1").val()) / 100;
		//силовая установка
		var powerW = parseFloat($("#var2").val()) / 100;
		//оборудование и управление
		var stuffW = parseFloat($("#var3").val()) / 100;
		//топливо
		var fuelW = parseFloat($("#var4").val()) / 100;
		//целевая и служебная наагрузки
		var wtfW = parseFloat($("#var5").val());
		//удельный расход топлива
		var fWaste = parseFloat($("#var6").val());
		//допустимая перегрузка
		var overload = parseFloat($("#var7").val());
		//количество двигателей
		var engs = parseFloat($("#var8").val());
		//Дальность полета
		var fRange = parseFloat($("#var9").val()) * 1000;
		//Высота полета
		var fHeights = parseFloat($("#var10").val()) * 1000;
		//Аэродинамическое качество
		var smth = parseFloat($("#var11").val());
		//Скорость
		var speed = parseFloat($("#var12").val());
		if ($("#spd").val() == "1")
			speed = speed * 340.29;
		else
			speed = speed * 1000 / 60 / 60;
		//Скорость захода на посадку
		var landingSpeed = parseFloat($("#var13").val());
		//Вертикальная скорость
		var vertSpeed = parseFloat($("#var14").val());
		//Скоростной напор
		var smthElse = parseFloat($("#var15").val());
		//Длина разбега
		var run = parseFloat($("#var16").val());
		//Коэффициент трения при взлете
		var fc = parseFloat($("#var17").val());
		//Коэффициент лобового сопротивления
		var resistanceC = parseFloat($("#var18").val());
		//Максимальное аэродинамиеское качество
		var maxAerodinamicQual = parseFloat($("#var19").val());
		//Аэродинамическое качество при взлете
		var startAerodinamicQual = parseFloat($("#var20").val());
		//Аэродинамическое качество при наборе высоты
		var anotherAerodinamicQual = parseFloat($("#var21").val());
		location.href = "result.html?var1=" + constrW + "&var2=" + powerW + "&var3=" + stuffW + "&var4=" + fuelW
			+ "&var5=" + wtfW + "&var6=" + fWaste + "&var7=" + overload + "&var8=" + engs + "&var9=" + fRange
			+ "&var10=" + fHeights + "&var11=" + smth + "&var12=" + speed + "&var13=" + landingSpeed
			+ "&var14=" + vertSpeed + "&var15=" + smthElse + "&var16=" + run + "&var17=" + fc + "&var18=" + resistanceC
			+ "&var19=" + maxAerodinamicQual + "&var20=" + startAerodinamicQual + "&var21=" + anotherAerodinamicQual;
	});
	$(".cls").change(function() {
		var val = parseInt($(this).val());
		var total = parseInt($("#var1").val()) + parseInt($("#var2").val()) + parseInt($("#var3").val()) + parseInt($("#var4").val()) - val;
		if (val > (95 - total))
			$(this).val(95 - total);
		calcWeight();
	});
});

function calcWeight() {
	var constrW = parseFloat($("#var1").val()) / 100;
	//силовая установка
	var powerW = parseFloat($("#var2").val()) / 100;
	//оборудование и управление
	var stuffW = parseFloat($("#var3").val()) / 100;
	//топливо
	var fuelW = parseFloat($("#var4").val()) / 100;
	//целевая и служебная наагрузки
	var wtfW = parseFloat($("#var5").val());
	var resWeight = wtfW / (1 - constrW - powerW - stuffW - fuelW);
	//в копилку говнокода
	//var k = Math.pow(10, (parseInt((Math.log(resWeight) / Math.log(10))) - 2));
	//if (k <= 0)
	//	k = 1;
	//p.s что тут вообще происходит (╯°□°）╯︵ ┻━┻
	var k = 100;
	if (resWeight < 1000)
		k = 1;
	resWeight =  parseInt(resWeight / k) * k;
	$("#wght").text("Взлетная масса = " + resWeight + " кг");
}