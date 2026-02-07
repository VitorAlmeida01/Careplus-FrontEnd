import  Dashboard  from "../../components/dashboard/Dashboard";
import Layout from "../../components/layout/Layout";
import './style.css'

export default function TelaDashboard(){
    return(
    <>
        <Layout>
        <div className="containerTelaDashboard">
            <Dashboard/>
        </div>
    </Layout>
    </>
    )

}