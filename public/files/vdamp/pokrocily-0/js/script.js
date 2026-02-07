jQuery(document).ready(function($) {

  // Tabulka s variantami

  $('.variants-table').on('click', 'td', function(event) {
    $(this).closest('tr').find('.variants-table-radio input[type=radio]').attr('checked', 'checked');
  });

  // Stepper, pridavani nebo odebirani hodnoty v inputu

  $('.stepper .stepper-plus').on('click', function(){
    $(this).siblings('.stepper-input').val(parseInt($(this).siblings('.stepper-input').val()) + 1);
    return false;
  });

  $('.stepper .stepper-minus').on('click', function(){
    $(this).siblings('.stepper-input').val(parseInt($(this).siblings('.stepper-input').val()) - 1);
    return false;
  });

});
