export default function Ticket(props) {
    const { ticket } = props;

    useEffect(() => {
        document.getElementById("ticket").style.backgroundImage = `url(${ticket})`;
        document.getElementById("ticket").style.backgroundSize = "cover";
    }, []);



    return (
        <div>
            <div id="ticket"></div>
            <div id="download-ticket">
                <button id="download-ticket-button" onClick={() => downloadTicket()}> Download </button>
            </div>
        </div>
    );
}
