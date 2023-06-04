from flask import Flask, render_template
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    Dimension,
    Metric,
    RunRealtimeReportRequest,
)
from google.protobuf.json_format import MessageToJson
import json

app = Flask(__name__)


def run_realtime_report(property_id="312974221"):
    # Using a default constructor instructs the client to use the credentials
    # specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.

    """Runs a realtime report on a Google Analytics 4 property."""
    client = BetaAnalyticsDataClient()

    # 30분 동안의 사용자(디바이스 기기) D: deviceCategory, M: activeUsers
    # 잠재고객 별 사용자 D: audienceName, M: activeUsers
    # 페이지 제목 및 화면 이름 별 조회수 D: unifiedScreenName, M: activeUsers
    # 이벤트 이름 별 이벤트 수 D: eventName, M: eventCount
    # 이벤트 이름 별 전환 D: eventName, M: conversions

    request1 = RunRealtimeReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="deviceCategory")],
        metrics=[Metric(name="activeUsers")],
    )
    response1 = client.run_realtime_report(request1)

    response1_dict = json.loads(MessageToJson(response1._pb))

    request2 = RunRealtimeReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="audienceName")],
        metrics=[Metric(name="activeUsers")],
    )
    response2 = client.run_realtime_report(request2)

    # response2_dict = json.loads(MessageToJson(response2._pb))

    request3 = RunRealtimeReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="unifiedScreenName")],
        metrics=[Metric(name="activeUsers")],
    )
    response3 = client.run_realtime_report(request3)

    # response2_dict = json.loads(MessageToJson(response2._pb))

    request4 = RunRealtimeReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="eventName")],
        metrics=[Metric(name="eventCount")],
    )
    response4 = client.run_realtime_report(request4)

    # response2_dict = json.loads(MessageToJson(response2._pb))

    request5 = RunRealtimeReportRequest(
        property=f"properties/{property_id}",
        dimensions=[Dimension(name="eventName")],
        metrics=[Metric(name="conversions")],
    )
    response5 = client.run_realtime_report(request5)

    # response2_dict = json.loads(MessageToJson(response2._pb))
    
    return response1, response2, response3, response4, response5


@app.route("/")
def index():
    
    response1, response2, response3, response4, response5 = run_realtime_report()
    print(response1)
    return render_template(
        "index.html",
        response1=response1,
        response2=response2,
        response3=response3,
        response4=response4,
        response5=response5,
    )


# @app.route("/get_data")
# def get_data():
#     response1, response2, response3, response4, response5 = run_realtime_report()
#     data1 = [
#         {"category": row.dimension_values[0].value, "value": row.metric_values[0].value}
#         for row in response1.rows
#     ]
#     return jsonify(data1=data1)

@app.route("/get_data")
def get_data():
    response1, response2, response3, response4, response5 = run_realtime_report()
    return {
        "response1": response1,
        "response2": response2,
        "response3": response3,
        "response4": response4,
        "response5": response5
    }
if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
