(() => {
    const video = document.getElementById('screen');
    const btnStart = document.getElementById('btnStart');
    const btnStop = document.getElementById('btnStop');

    let stream;

    btnStart.addEventListener('click', event => {
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    mediaSource: 'screen'
                }
            }).then(returnedStream => {
                stream = returnedStream;
                video.srcObject = returnedStream;
                btnStart.style.display = 'none';
                btnStop.style.display = 'inline';
            })
            .catch(err => {
                console.error('Could not get stream: ', err);
            });
    });

    btnStop.addEventListener('click', event => {
        stream.getTracks().forEach(track => track.stop());
        video.src = '';
        btnStop.style.display = 'none';
        btnStart.style.display = 'inline';
    });
})();