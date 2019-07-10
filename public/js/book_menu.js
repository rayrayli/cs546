(function($) {

	let oldCat = null;
	$(document).ready(function(){
		$(".cat-button").click(function(){
			let value = $(this).attr("data-filter");
			if (value == 'all') 
			{
				$(".book_single").show("1000")
				oldCat = null;

			} else {
				$(".book_single").not("." + value).hide("1000");
				$(".book_single").filter("." + value).show("1000");
				oldCat = value;
			}
		})
	});
	$(document).ready(function(){
		$(".cat-search").click(function(){
			const firstNumberElement = document.getElementById("input");
			let searchValue = firstNumberElement.value;
//			console.log(searchValue)

			if (oldCat) 
			{
				$(".book_single").not("." + oldCat).hide("1000");
				$(".book_single").filter("." + oldCat).show("1000");
			}else
			{
				$(".book_single").show("1000")
			}

			if (!searchValue ) {
			}
			else{
				$(".book_single").not("." + searchValue).hide("1000");
				$(".book_single_name").filter("." + searchValue).show("1000");
			}
		})
	});

	$(document).ready(function(){
		$('.book_single_add').click(function() {
			let book_id = $(this).attr("book-id");
			console.log(book_id);
			let book = $(this).attr("book-name");
			//console.log(book);
			let price = Number($(this).attr("book-price"));
			//console.log(price);
			if (!sessionStorage.getItem('order_items')) {
			let orders = [];
			let current_order = {};
			current_order.book_id = book_id;
			current_order.book_name = book;
			current_order.price = price;
			current_order.quantity = 1;
			orders.push(current_order);
			sessionStorage.setItem('order_items', JSON.stringify(orders));
			console.log("init: " + JSON.parse(sessionStorage.getItem('order_items')));
			} else {
				let change = false;
				let orders_now = JSON.parse(sessionStorage.getItem('order_items'));
				for (let i = 0;i < orders_now.length; i++) {
					let current_item = orders_now[i];
					console.log(current_item.book_id);
					if (current_item.book_id == book_id) {
						let quant_before = current_item.quantity;
						console.log(quant_before);
						orders_now[i].quantity = quant_before + 1;
						console.log(orders_now[i].quantity);
						sessionStorage.setItem('order_items', JSON.stringify(orders_now));
						change = true;
						return;
					} //update if exist
				}
				if (change == false) {
					let current_order = {};
					current_order.book_id = book_id;
					current_order.book_name = book;
					current_order.price = price;
					current_order.quantity = 1;
					orders_now.push(current_order);
					sessionStorage.setItem('order_items', JSON.stringify(orders_now));
				}
				
				console.log(orders_now);
			}
			// let current_order = {};

		})
	});



	// $(document).ready(function(){
	// 	$(".delete-button").click(function(){
	// 		let order_no = $(this).attr("order_no");
	// 		let currentID = "order_" + order_no;
	// 		let div_remove =document.getElementById(currentID);
	// 		order_now =JSON.parse(localStorage.getItem('order_items'));
	// 		order_after = order_now.splice(order_no, 1);
	// 		localStorage.setItem('order_items', JSON.stringify(order_after));
	// 	})
	// });


})(jQuery);


