import ApiService from '@framework/api-service';
import PointDataAdapter from '@/adapter/pointDataAdapter';

const Method = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

const EndPoint = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export default class TripApiService extends ApiService {
  get points() {
    return this._load({
      url: EndPoint.POINTS,
      method: Method.GET,
    }).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({
      url: EndPoint.DESTINATIONS,
      method: Method.GET
    }).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({
      url: EndPoint.OFFERS,
      method: Method.GET
    }).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${EndPoint.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(PointDataAdapter.toApi(point)),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    return ApiService.parseResponse(response);
  }

}
