(() => {
    const video = document.getElementById('screen');
    const btnStart = document.getElementById('btnStart');
    const btnStop = document.getElementById('btnStop');
    const mediaSource = new MediaSource();

    btnStart.addEventListener('click', start);
    btnStop.addEventListener('click', stop);

    let stream, recorder, mic;

    function start() {
        mic = document.getElementById('mic').checked;
        mediaSource.addEventListener('sourceopen', function (e) {
            sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vorbis,vp8"');
        });

        navigator.mediaDevices
            .getUserMedia({
                video: {
                    mediaSource: 'screen'
                },
                audio: mic
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

    function stop() {
        saveRecording();
        stream.getTracks().forEach(track => track.stop());
        video.src = '';
        btnStop.style.display = 'none';
        btnStart.style.display = 'inline';
    }

    function saveRecording() {
        recorder.ondataavailable = e => {
            ul.style.display = 'block';
            var a = document.createElement('a'),
                i=document.createElement('i'),
                li = document.createElement('li');
            li.className = 'list-group-item';
            i.className= 'fa fa-play';
            a.download = ['video_', Date.now(), '.webm'].join('');
            a.href = URL.createObjectURL(e.data);
            a.textContent = a.download;
            li.appendChild(i);
            li.appendChild(a);
            ul.appendChild(li);
        };
        recorder.stop();
    }

})();