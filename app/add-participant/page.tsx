import CreateParticipantForm from "@/components/participant/create-participant";

export default function AddParticipantPage() {
    return (
        <div className="flex flex-column align-items-center justify-content-evenly mt-5 text-center">
            <h1>Join the exchanging of gifts!</h1>
            <p className="text-gray-400">
                Fill in the form below to participate in the gift exchange.
                We&apos;re excited to have you join us!
            </p>
            <CreateParticipantForm />
            <div className="mt-5 w-6">
                <h2>What&apos;s next?</h2>
                <p className="text-gray-300">
                    After you&apos;ve added your name, you&apos;ll be included
                    in the gift exchange. You&apos;ll receive an email with the
                    name of the person you&apos;re buying a gift for, along with
                    their wish list.
                </p>
            </div>
        </div>
    );
}
