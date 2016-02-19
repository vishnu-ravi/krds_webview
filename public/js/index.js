var timeout;

document.getElementById("btn_submit").addEventListener("click", function()
{
    try
    {
        var url     =	document.getElementById("url").value;

        if(url.length == 0)
            throw{'msg': 'Empty Url', 'elt':'url'};

        var pattern =   /^((http|https):\/\/)/;

        if( ! pattern.test(url))
        {
            var protocol    =   document.getElementById("protocol");
            protocol        =   protocol.options[protocol.selectedIndex].value;
            url             =   protocol + url;
        }

        var regex   =   new RegExp("^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$");

        if( ! regex.test(url))
            throw{'msg': 'Invalid Url', 'elt':'url'};

        window.CallJavaAdapter.goToSite(url);
        document.getElementById('loader').style.display	=	'block';

        return true;
    }
    catch(e)
    {
        document.getElementById("error").innerHTML	=	e.msg;
        document.getElementById("error").style.display	=	'block';

        if(e.elt)
            document.getElementById(e.elt).focus();

        if(typeof timeout != 'undefined')
            clearTimeout(timeout);

        timeout     =   setTimeout(function()
        {
            document.getElementById("error").innerHTML      =	'';
            document.getElementById("error").style.display	=	'none';
        }, 4000);
    }
});
