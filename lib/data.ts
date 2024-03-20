import prisma from "./db";

// create type for previous state in creating Participant
type PreviousState = {};

export async function createParticipant(
    _prevState: PreviousState,
    formData: FormData
) {
    const name = formData.get("name");
    const wishlist = formData.get("wishlist");

    if (!name || !wishlist) {
        return {
            error: "Please enter your name and your wishlist",
            resetForm: false,
        };
    }

    let wishlistArray: string[] | undefined;

    if (typeof wishlist === "string") {
        wishlistArray = wishlist.split(", ");
    }

    await prisma.participant.create({
        data: {
            name: name as string,
            wishlist: wishlistArray,
        },
    });

    return { resetForm: true };
}
