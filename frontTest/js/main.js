$(document).ready(function(){
	var productsArray = [];
	var productsQuantity = $("#quantity_products").val()*1;
	var productsData = "products.json";
	var quantityButton = $("#quaintity_button");
	var everyAssos;

	function constructor(obj){
		var source   = $("#product-template").html();
		var template = Handlebars.compile(source); 
		var context = obj;
		context.map(function(obj){
			obj.newAssos = obj.assocProducts.split(";");
		});
		$(".product__area").html(template(context));
	};
	function readfile(){
		$(".product__area").html("");
		$.getJSON( productsData, {
		  format: "json"
		}).done(function( data ) {
			if(productsQuantity != 0){
				productsArray = data.slice(0, productsQuantity)
				constructor(productsArray);
			}
		});	
	}
	readfile();

	quantityButton.on("click", function(){
		productsQuantity = $("#quantity_products").val()*1;
		readfile();
	})

	// Изменение типа покупки
	
	$(".product__area").on("click",".unit--select", function(e){
		var i = e.target.dataset.id;
		$(e.currentTarget).addClass("unit--active");
		$(e.currentTarget).siblings(".unit--select").removeClass("unit--active");
		$(".list--unit-desc[data-id = "+i+"]").toggle();
	});

	// Изменение количества товара

	function change(v, i){
		var dataNumber = $(".product__count.stepper-input[data-id = "+i+"]");
	    var upd = +dataNumber.val()+v;
	    dataNumber.val( upd>0 ? upd : 0); 
	}   
	$(".product__area").on("click",".stepper-arrow-up", function(e){
		var i = e.target.dataset.id;
		change(1, i);
	});
	$(".product__area").on("click",".stepper-arrow-down", function(e){
		var i = e.target.dataset.id;
		change(-1, i);
	});

});