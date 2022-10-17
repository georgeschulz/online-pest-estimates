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
                        {`<div data-tf-widget="NRYHpcB1" data-tf-iframe-props="title=Contract test" data-tf-medium="snippet" data-tf-hidden="first_name=xxxxx,last_name=xxxxx,email=xxxxx,address=xxxxx,city=xxxxx,state=xxxxx,price_per_service=xxxxx,contract_id=xxxxx,service_name=xxxxx" style="width:100%;height:400px;"></div><script src="//embed.typeform.com/next/embed.js"></script>`}
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