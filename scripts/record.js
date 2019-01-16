(() => {
    const video = document.getElementById('screen');
    const btnStart = document.getElementById('btnStart');
    const btnStop = document.getElementById('btnStop');
    const mediaSource = new MediaSource();

    btnStart.addEventListener('click', start);
    btnStop.addEventListener('click', stop);

    let stream,recorder;

    function start() {
        mediaSource.addEventListener('sourceopen', function(e) {
            console.log('sourceopen')
            sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
        });

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
                recorder = new MediaRecorder(returnedStream, {
                });
                recorder.start();
            })
            .catch(err => {
                console.error('Could not get stream: ', err);
            });
    }

    function stop(){
        saveRecording();
        stream.getTracks().forEach(track => track.stop());
        video.src = '';
        btnStop.style.display = 'none';
        btnStart.style.display = 'inline';
    }

    function saveRecording(){
        recorder.ondataavailable = e => {
            ul.style.display = 'block';
            var a = document.createElement('a'),
                li = document.createElement('li');
            a.download = ['video_', new Date(), '.webm'].join('');
            a.href = URL.createObjectURL(e.data);
            a.textContent = a.download;
            li.appendChild(a);
            ul.appendChild(li);
        };
        recorder.stop();
    }
    
})();