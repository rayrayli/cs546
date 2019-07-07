(function() {
  if (sessionStorage && sessionStorage.getItem('order_items')) {
    let orders_now = JSON.parse(sessionStorage.getItem('order_items'));
    //localStorage.clear();
    var orderDOM = document.getElementById('order_now');
    const priceDOM = document.getElementById("total_price");
 
    let total_price = 0;
    let order = [];
    try {
    for (let i = 0; i < orders_now.length; i++) {
      //console.log(orders_now[i]);
      let eachOrder = {};
      var ul = document.createElement("ul");
      ul.setAttribute("id", "order_" + i);
      var d=document.createElement("div"); 
      d.textContent = orders_now[i].book_name;
      eachOrder.book_name = orders_now[i].book_name;
      ul.appendChild(d);
      var d=document.createElement("div"); 
      d.textContent = orders_now[i].quantity;
      eachOrder.quantity = orders_now[i].quantity;
      ul.appendChild(d);
      order.push(eachOrder);
      var d=document.createElement("div"); 
      d.textContent = "Price : " + orders_now[i].quantity * orders_now[i].price;
      total_price = total_price + orders_now[i].quantity * orders_now[i].price;
      ul.appendChild(d);
      var b=document.createElement("button");
      b.textContent = "Delete";
      b.className = "book_single_delete";
      b.setAttribute('order_no',i);
      b.setAttribute('class', 'delete-button');
      ul.appendChild(b);

      orderDOM.appendChild(ul);
    } //for
    let order_total_price = document.createElement("div");
    totalTextNode = document.createTextNode("Total Price: " + total_price.toFixed(2));
    order_total_price.appendChild(totalTextNode);
    priceDOM.appendChild(order_total_price);

    
    var submit_button = document.getElementById('place_order');
    console.log(order);
    submit_button.setAttribute("order", order);
  
    $(document).ready(function() {
      $('.place_order').click(function() {
        let order = $(this).attr("order");
        $.ajax({
          url:'http://localhost:3000/check-out',
          method:'POST',
          data:{
            order: order,
            total_price : total_price
          },
          success:function(data){
            sessionStorage.clear();
          }
        });
      })
    });

    $(document).ready(function() {
      $('.delete-button').click(function() {
        order_total_price.removeChild(totalTextNode);
        let order_id = $(this).attr("order_no");
        total_price = total_price - orders_now[order_id].quantity * orders_now[order_id].price;
        totalTextNode = document.createTextNode("Total Price: " + total_price.toFixed(2));
        order_total_price.appendChild(totalTextNode);
        let item = document.getElementById("order_"+order_id);
        item.parentNode.removeChild(item);
      })
    });  
  } catch (e) {
    
  }
      }//if 
  })();