import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import Btn from "@/components/ui/button";

export default function CreateGroup() {
    return (
        <form className="flex flex-column gap-3 bg-gray-900 p-5 w-5 mx-auto text-left border-round">
            <div>
                <label htmlFor="groupName" className="block mb-1">
                    Group Name
                </label>
                <InputText className="w-full" name="groupName" id="groupName" />
            </div>
            <div>
                <label htmlFor="giftBudget" className="block mb-1">
                    Budget for Gift
                </label>
                <InputNumber
                    className="w-full"
                    name="giftBudget"
                    id="giftBudget"
                />
            </div>
            <div>
                <label htmlFor="exchangeDate" className="block mb-1">
                    Date of Exchanging Gifts
                </label>
                <Calendar
                    className="w-full"
                    showIcon
                    placeholder="dd/mm/yy"
                    dateFormat="dd/mm/yy"
                />
            </div>
            <Btn className="w-6 mx-auto mt-3">Create</Btn>
        </form>
    );
}
