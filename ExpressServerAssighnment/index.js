const express = require("express");

const app = express();


app.get("", (req, res) => {
    res.send("Hello");
})

app.get("/books", (req, res) => {
    res.send(
        [
            {
                bookName1 : "Wings of fire",
                content : "The book begins with the childhood of Kalam's life. In the beginning, he introduces us to his family and tries to familiarize us with his birthplace Rameswaram. In the childhood, he was a great admirer of his father, Jainulabdeen. He was a man of great wisdom and kindness, and Pakshi Lakshmana Sastry, a close friend of his father and the head priest of the Rameswaram Temple. He had an ideal helpmate in his mother, Ashiamma. He was also influenced by his close friend, Ahmed Jalaluddin; he was about 15 years older than Kalam. With his friend, he talked about spiritual matters. This shows that he believed in spirituality and also believed in God or Khuda. He always went to Lord Shiva's temple with his friends."
            },
            {
                bookName2 : "Atomic Habbits",
                content : "An atomic habit is a regular practice or routine that is not only small and easy to do but is also the source of incredible power; a component of the system of compound growth. Bad habits repeat themselves again and again not because you don’t want to change, but because you have the wrong system for change."
            },
            {
                bookName3 : "The power of your subconscious mind",
                content : "Dr. Joseph Murphy explains that life events are actually the result of the workings of your conscious and subconscious minds. He suggests practical techniques through which one can change one's destiny, principally by focusing and redirecting this miraculous energy. Years of research studying the world's major religions convinced him that some Great Power lay behind all spiritual life and that this power is within each of us"
            }
        ]
    );
})

app.listen(4545, () => {
    console.log("Listening on port 4545 by Gaurav");
})