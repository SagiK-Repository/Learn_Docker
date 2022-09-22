const express = require('express'); // express를 가져온다.

const app = express();
// 요청이 오면
app.get('/', (req, res) => {
    res.send('🐳Dream Coding in Docker!🐳'); // 이 메시지가 나오도록 백엔드 어플리케이션을 구성한다.
});

// 8080포트에 서버를 구동
app.listen(8080, () => console.log('Server is running'));