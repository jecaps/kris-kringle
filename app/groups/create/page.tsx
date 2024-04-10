import CreateGroupForm from "@/components/groups/create-group";

export default function CreateGroupPage() {
    return (
        <div className="flex flex-column justify-content-center gap-8 text-center w-full h-screen">
            <div>
                <h1 className="text-6xl mb-1">
                    Start Your Own Gift Exchange Group!
                </h1>
                <p className="text-2xl">
                    Initiate a unique gift exchange experience with your
                    friends, family, or colleagues. It&apos;s an excellent
                    opportunity to foster stronger bonds and bring a touch of
                    surprise and joy into someone&apos;s day.
                </p>
            </div>

            <div>
                <h2>Create your group</h2>
                <p className="text-gray-300">
                    Just fill in the details below and click the
                    &quot;Create&quot; button. We&apos;ll take care of the rest!
                </p>
                <CreateGroupForm />
            </div>
        </div>
    );
}
