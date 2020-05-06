$(document).ready(function() {
    $('#fullpage').fullpage({
        responsiveWidth: 768,
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['', 'Initiative/Innovation', 'Teamwork', 'Work ethic, time management, prioritizing and/or multi-tasking', 'Communication or Presentation Skills', 'Perseverance and Determination']
    });
    var vid = document.getElementById("VidBack");
    vid.playbackRate = 0.4; 
});

$('.readOn').click(function(e){
    console.log(e.currentTarget.id);
    url = e.currentTarget.id + ".html";
    if (e.currentTarget.id == 'ino') {
        $('.modal-title').text("Initiative/Innovation");
    }
    $('#icontent').attr('src',url);
    $('#myModal').modal();
});

