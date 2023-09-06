<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
</head>
<body>

</body>
<script>
    var settings = {
        "url": "https://svm.mobiup.io/api/v1/user",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTExNjc3NzYsImV4cCI6MTcyMjcwMzc3NiwiZW1haWwiOiJlcmljay5xdWVpcm96QG1vYml1cC5jb20uYnIifQ.ShxyScUBG21OTzXE8xPAIdaL-J-IjHWGegV4dmpv3jM"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
</script>
</html>
