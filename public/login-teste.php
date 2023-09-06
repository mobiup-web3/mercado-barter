<html>
    <head>
        <script src="https://code.jquery.com/jquery-3.7.0.slim.min.js" integrity="sha256-tG5mcZUtJsZvyKAxYLVXrmjKBVLd6VpVccqz/r4ypFE=" crossorigin="anonymous"></script>
    </head>
    <body>

    </body>
    <script>
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTE1NDc0NTgsImV4cCI6MTcyMzA4MzQ1OCwiZW1haWwiOiJlcmljay5xdWVpcm96QG1vYml1cC5jb20uYnIifQ.uLQJcudgwUok1XvAJyCZWosDxJveeS6MfJOecOaVq3A");

        var raw = "";

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("https://svm.mobiup.io/api/v1/editorial", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    </script>
</html>
