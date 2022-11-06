import { useNavigate, useParams } from "react-router-dom";
import LargeButton from "../components/buttons/button";
import CodeBlock from "../components/CodeBlock/CodeBlock";
import ApplicationMainLayout from "../components/layout/ApplicationMainLayout/ApplicationMainLayout";
import { Link } from "react-router-dom";

function Code() {
    const { widgetId } = useParams();

    return (
        <div>
            <ApplicationMainLayout header="Congrats! Your ready to go.">
                <div className="px-4 py-6">
                    <h2 className="text-2xl font-semibold font-poppins">Embed Code</h2>
                    <p className="text-lg">Copy and paste this code onto your website to create your dynamic pricing widget!</p>
                    <CodeBlock>
                        {`
                            <div class="pricing-widget-container" widget-id="${widgetId}"></div>
                            <script src="https://onlinepestestimates.herokuapp.com/js/main.b57a9479.js"></script>
                            <link rel="stylesheet" type="text/css" href="https://onlinepestestimates.herokuapp.com/css/main.f73cbdd5.css">
                        `}
                    </CodeBlock>
                    <br />
                    <div className="flex space-x-4">
                        <Link to={`/widgets`}><LargeButton size={0} className="justify-center">Back to Home</LargeButton></Link>
                        <Link to={`/widget-information/${widgetId}/edit`}><LargeButton size={0} className="justify-center">Edit Widget</LargeButton></Link>
                    </div>
                </div>
            </ApplicationMainLayout>
        </div>
    )
}

export default Code;