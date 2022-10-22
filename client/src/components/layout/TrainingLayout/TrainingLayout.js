import ApplicationMainLayout from "../ApplicationMainLayout/ApplicationMainLayout"
import { Link } from "react-router-dom";

function TrainingLayout({ header, loomEmedLink, children }) {
    return (
        <ApplicationMainLayout header="Training Center" currentPage="training">
            <h2 className="text-2xl font-semibold font-poppins">{header}</h2>
            <div className="grid grid-cols-3 mt-16 px-16">
                <article className="col-span-2">
                    <div className="w-full mb-8">
                        <iframe className="w-full aspect-video" src={loomEmedLink} frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen={true}></iframe>
                    </div>
                    <div className="text-xl font-roboto leading-relaxed space-y-8">
                       {children}
                    </div>
                </article>
                <div className="px-10 py-4">
                    <aside className="rounded-md shadow-container py-8 px-7 fixed">
                        <p className="text-2xl font-bold mb-4">Lessons</p>
                        <ol className=" text-primary underline list-decimal pl-8 space-y-1">
                            <li><Link to="/">Designing the Ultimate Calculator (4:23)</Link></li>
                            <li><Link to="/">Systems to Conquer the World (23:20)</Link></li>
                            <li><Link to="/">Closing online sales - office role (18:00)</Link></li>
                            <li><Link to="/">Closing online sales - tech role (4:23)</Link></li>
                            <li><Link to="/">Plugging holes in the pipeline (8:00)</Link></li>
                            <li><Link to="/">Reaching jungle cat speed (21:00)</Link></li>
                        </ol>
                        
                    </aside>
                </div>

            </div>
        </ApplicationMainLayout>
    )
}

export default TrainingLayout;