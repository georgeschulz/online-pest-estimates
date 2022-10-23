import { useDispatch, useSelector } from "react-redux";
import { deleteWidget, selectUserWidgets } from "../../redux/widgetSlice";
import menu from '../../assets/menu.png'
import { Link, Navigate, useNavigate } from "react-router-dom";
import DropdownMenu from "../layout/Nav/dropdownMenu";
import { publishWidget } from "../../redux/widgetSlice";

function WidgetTable({isLoading = true}) {
    const widgets = useSelector(selectUserWidgets);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    return (
        <div className="flex flex-wrap px-5 py-8">
            <div className="px-2 text-xl font-roboto w-full font-semibold flex border-b border-neutral-400">
                <div className="w-6/12">Program Name</div>
                <div className="w-2/12 flex justify-end">Starts At</div>
                <div className="w-2/12 flex justify-end pr-10">Status</div>
                <div className="w-2/12 flex justify-end">Menu</div>
            </div>
            {widgets.map(widget => {
                return (
                    <div className="px-3 w-full flex py-3 text-xl font-roboto border-b border-neutral-400" key={widget.widget_id}>
                        <div className="w-6/12 hover:underline"><Link to={`/widget-information/${widget.widget_id}/edit`}>{widget.program}</Link></div>
                        <div className="w-2/12 flex justify-end">{widget.starts_at ? "$" + widget.starts_at : "$0"}</div>
                        <div className="w-2/12 flex items-center justify-end">
                            <div style={{'width': '90px'}}>
                                {widget.active 
                                    ? (<div className="flex items-center"><div className="w-6 h-6 border border-stone-400 mr-2 bg-green-500 rounded-full"></div><p>Active</p></div>)
                                    : (<div className="flex items-center"><div className="w-6 h-6 mr-2 border border-stone-400  bg-red-500 rounded-full"></div><p>Draft</p></div>)
                                }
                            </div>
                        </div>
                        <div className="w-2/12 justify-end flex">
                            <DropdownMenu h="8" w="8" position="right-24" closeIcon={menu} openIcon={menu} menuItems={[
                                {label: 'Edit', handler: () => navigate(`/widget-information/${widget.widget_id}/edit`)},
                                {label: 'Reset Price Formula', handler: () => navigate(`/strategies/${widget.widget_id}/edit`)},
                                {label: 'Delete', handler: () => dispatch(deleteWidget(widget.widget_id))},
                                {label: widget.active ? 'Make Inactive' : 'Publish', handler: () => dispatch(publishWidget(widget.widget_id))}
                            ]} />
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default WidgetTable;