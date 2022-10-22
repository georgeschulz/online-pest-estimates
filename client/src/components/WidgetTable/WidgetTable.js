import { useSelector } from "react-redux";
import { selectUserWidgets } from "../../redux/widgetSlice";
import menu from '../../assets/menu.png'
import { Link } from "react-router-dom";
import DropdownMenu from "../layout/Nav/dropdownMenu";

function WidgetTable({isLoading = true}) {
    const widgets = useSelector(selectUserWidgets);

    return (
        <div className="flex flex-wrap px-5 py-8">
            <div className="text-xl font-roboto w-full font-semibold flex">
                <div className="w-6/12">Program Name</div>
                <div className="w-2/12 flex justify-end">Starts At</div>
                <div className="w-2/12 flex justify-end">Status</div>
                <div className="w-2/12 flex justify-end">Menu</div>
            </div>
            {widgets.map(widget => {
                return (
                    <div className="w-full flex py-3 text-xl font-roboto" key={widget.widget_id}>
                        <div className="w-6/12 hover:underline"><Link to={`/widget-information/${widget.widget_id}/edit`}>{widget.program}</Link></div>
                        <div className="w-2/12 flex justify-end">{widget.starts_at ? "$" + widget.starts_at : "$0"}</div>
                        <div className="w-2/12 flex items-center justify-end">
                            {widget.active 
                                ? (<div className="flex"><div className="w-7 h-7 mr-2 bg-green-500 rounded-full"></div><p>Active</p></div>)
                                : (<div className="flex"><div className="w-7 h-7 mr-2 bg-red-500 rounded-full"></div><p>Draft</p></div>)
                            }
                        </div>
                        <div className="w-2/12 justify-end flex">
                            <DropdownMenu closeIcon={menu} openIcon={menu} menuItems={[
                                {label: 'Delete', handler: () => alert('delete!')}
                            ]} />
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default WidgetTable;