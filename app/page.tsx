import Btn from "@/components/ui/button";

export default function HomePage() {
    return (
        <main className="flex flex-column align-items-center justify-content-center gap-8 text-center h-screen">
            <div className="flex flex-column gap-4">
                <div>
                    <h1 className="text-6xl mb-1">
                        Hello there,{" "}
                        <span className="text-green-400">
                            welcome to the Gift Exchange!
                        </span>
                    </h1>
                    <p>
                        We&apos;re thrilled to have you here! Start your own
                        group and kick off a memorable gift exchange. It&apos;s
                        a wonderful way to bring people together and make
                        someone&apos;s day special.
                    </p>
                </div>
                <div>
                    <Btn href="/create-group" sizes="large" severity="success">
                        Launch Your Gift Exchange
                    </Btn>
                </div>
            </div>

            <div className="flex flex-column align-items-center gap-4">
                <div className="w-6">
                    <h2>How does it work?</h2>
                    <p className="text-gray-300 text-sm">
                        It&apos;s all about fun, surprises, and a dash of
                        mystery! First, gather your friends, family, or
                        colleagues and invite them to join the group. Once
                        everyone&apos;s in, that&apos;s when the magic happens!
                        We&apos;ll play secret Santa and assign each participant
                        a buddy to gift. An email will then be sent to each
                        participant with the name and the wishlist of their
                        secret buddy. It&apos;s a fantastic way to spread joy
                        and make someone&apos;s day a little brighter. So, are
                        you ready to get the party started?
                    </p>
                </div>
                <div className="w-6">
                    <h2>Why join us?</h2>
                    <p className="text-gray-300 text-sm">
                        Joining our Gift Exchange is not just about giving and
                        receiving gifts. It&apos;s about creating happy
                        memories, strengthening relationships, and spreading
                        joy. It&apos;s about the thrill of the surprise, the
                        excitement of the unknown, and the happiness that comes
                        from making someone else&apos;s day a little brighter.
                        So why wait? Start your own group today and let the
                        magic begin!
                    </p>
                </div>
            </div>
        </main>
    );
}
