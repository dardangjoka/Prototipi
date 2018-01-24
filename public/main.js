var che=0;

function CheckForCompany() 
{
    if (document.getElementById('company').checked) 
    {
        document.getElementById('form1').style.display = 'block';
        document.getElementById('form2').style.display = 'none';
    }
    else 
    {
        document.getElementById('form2').style.display = 'block';
        document.getElementById('form1').style.display = 'none';
    }

}

