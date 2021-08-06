jQuery(window).scroll(function(){
    var scroll = jQuery(window).scrollTop();

    if(scroll >=100){
        jQuery('.header').addClass('fixedheader');
    }else{
        jQuery('.header').removeClass('fixedheader');
    }
});

jQuery(document).ready(function(){
    AOS.init();
    jQuery('.dashbord_opction i').click(function(){
        jQuery('.dashbord_opction ul').slideToggle();
    });
});


// 
jQuery(document).on("click", ".qty-plus", function(){
    jQuery(this)
    .prev().val(+$(this).prev().val() + 1);
 });
 jQuery(document).on("click", ".qty-minus", function(){
    if($(this).next().val()> 0 )
    $(this).next().val(+$(this).next().val() - 1);
 });

 // 
jQuery(document).ready(function(){
    jQuery(".search_outer i.fa-exchange").click(function(){
        jQuery(".low_high_price").slideToggle();
    });
});
