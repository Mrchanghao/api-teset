(function() {

    'use strict'

    // 
    // geocode();


    //  form 속성 가져오기 
    var locationForm = document.querySelector('.location-form')
    console.log(locationForm);
    // 이벤트 연결 
    locationForm.addEventListener('submit', geocode);


    function geocode(e) {
        e.preventDefault();
        var location = document.querySelector('.location-input').value;
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: location,
                    key: 'AIzaSyBAieJV5pinpVJaNItGg8MMLWs2o7j4pDc'
                }
            })
            .then(function(response) {
                // 정상 응답 
                console.log(response);
                console.log(response.data.results[0].formatted_address)
                    // formatted_address 정의 
                var formattedAddress = response.data.results[0].formatted_address
                var formattedAddressOutput = `
                <ul class="list-group">
                  <li class="list-group-item">${formattedAddress}</li>
                </ul>
                `

                // 다른 주소 목록 
                var addressComponents = response.data.results[0].address_components;
                // console.log(addressComponents);
                var addressComponentsOutput = '<ul class="list-group">';
                for (var i = 0; i < addressComponents.length; i++) {
                    addressComponentsOutput += `
                  <li class="list-group-item"><strong>${addressComponents[i].types[0]
                  }</strong>: ${addressComponents[i].long_name}<li>
                  `;
                    // console.log(addressComponentsOutput)
                }
                addressComponentsOutput += '</ul>';

                //위도 경도 정보
                var latitude = response.data.results[0].geometry.location.lat
                var longitude = response.data.results[0].geometry.location.lng
                var geometryOutput = `
                <ul class="list-group">
                  <li class="list-group-item">경도: ${latitude}</li>
                  <li class="list-group-item">위도: ${longitude}</li>
                </ul>
                `;

                //출력
                document.getElementById('formatted-address').innerHTML =
                    formattedAddressOutput;
                document.getElementById('address-components').innerHTML =
                    addressComponentsOutput;
                document.getElementById('geometry').innerHTML =
                    geometryOutput;



            })
            .catch(function(error) {
                console.log(error);
            })
    }


})(window);