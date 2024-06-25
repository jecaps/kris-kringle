import nodemailer from "nodemailer";
import { fetchSantaMapping } from "./data";

interface Participant {
    id: string;
    name: string;
    email: string;
    wishlist: string[];
}

export function shuffleParticipants(participants: Participant[]) {
    const shuffled = [...participants].sort(() => Math.random() - 0.5);

    for (let i = 0; i < participants.length; i++) {
        if (participants[i].id === shuffled[i].id) {
            const nextIndex = (i + 1) % shuffled.length;
            [shuffled[i], shuffled[nextIndex]] = [
                shuffled[nextIndex],
                shuffled[i],
            ];
        }
    }

    return shuffled;
}

export async function sendEmail(groupId: string) {
    const { group, result } = await fetchSantaMapping(groupId);
    const user = process.env.EMAIL;
    const pass = process.env.PASSWORD;

    const transporter = nodemailer.createTransport({
        host: "smtp.strato.de",
        port: 465,
        secure: true,
        auth: {
            user,
            pass,
        },
    });

    // transporter.verify((error, success) => {
    //     if (error) {
    //         console.error("Connection error:", error);
    //         return;
    //     } else {
    //         console.log("Server is ready to take our messages");
    //     }
    // });

    await new Promise((resolve, reject) => {
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });

    result.map(async (item) => {
        const mailOptions = {
            from: user,
            to: item.santaEmail,
            subject: "Hello",
            html: `
                <div>
                    <h2>Hello, ${item.santaName}!</h2>
                    <p>
                        We’re so excited to have you join us for this year's gift exchange! 🎁
                    </p>
                    <p>
                        Your secret buddy is <strong>${
                            item.receiver
                        }</strong>! It’s time to spread some holiday cheer and make their day extra special.
                    </p>
                    <p>
                        Here’s what ${item.receiver} is hoping for:
                    </p>
                    <p>
                        ${item.receiverWishlist?.join(", ")}
                    </p>
                    <p>
                        This year, you’re part of the <strong>${
                            group?.name
                        }</strong> group. We’ve got an amazing group of people and we can’t wait to see the joy you bring to each other.
                    </p>
                    <p>
                        A few details to keep in mind:
                    </p>
                    <p>
                        <strong>Gift Budget:</strong> ${group?.budget}
                        <br>
                        <strong>Exchange Date:</strong> ${group?.dateOfExchange}
                    </p>
                    <p>
                        We recommend starting your shopping early to ensure you find the perfect gift. Remember, it’s the thought that counts, so put your heart into it and have fun!
                    </p>
                    <p>
                        Happy gifting and happy holidays!
                    </p>
                    <p>
                        Warm wishes,
                        <br>
                        The SwapNJoy Team
                    </p>
                </div>
                `,
        };
        await transporter.sendMail(mailOptions);
    });
}
