/// <reference path="../jquery-3.5.1.js" /
var breeds;
$('document').ready(function () {
    $.get('https://dog.ceo/api/breeds/list/all', function (data) {
        breeds = data.message;
    });
    var keys = Object.keys(breeds);
    keys.forEach(e => {
        $('#breeds').append(`<option value="${e}">${e}</option>`)
    });
});

$('#breeds').on('change', function () {
    var selectedBreed = $('#breeds').val();
    var subBreeds = breeds[selectedBreed]
    $('#sub-breeds').css('display', 'none');
    $('#sub-breeds').html("<option value=''>Select Sub Breed</option>");
    if(subBreeds.length !== 0){
        subBreeds.forEach(e => {
            $('#sub-breeds').append(`<option value="${e}">${e}</option>`);
        });
        $('#sub-breeds').css('display', 'block');
    }
});

$('#get').on('click', function () {
    var breedName = '';
    $('.result').html("");
    if ($('#sub-breeds').val() !== '')
        breedName = $('#breeds').val() + '/' + $('#sub-breeds').val();
    else
        breedName = $('#breeds').val();
    $.get(`https://dog.ceo/api/breed/${breedName}/images`, function (data) {
        let images = data.message;
        images.forEach(e => {
            $('.result').append(`<img src="${e}" alt="">`)
        });
    });
});
