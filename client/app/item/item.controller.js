'use strict';
(function(){

class ItemComponent {
  constructor($state, $stateParams, API) {
    this.message = 'Hello';
    this.itemType = $state.params.itemType === 'mechanical' ? true : false;
    this.capacities = [];
    this.brands = [];
    this.compNos = [];
    this.categories = [];
    this.elecTypes = [];
    this.facilities = [];
    this.facilityTypes = [];
    this.outVoltages = [];
    this.measurements = [];
    this.API = API;
    this.$stateParams = $stateParams;
    this.$state = $state;
    this.item = {};
  }

  $onInit() {
    const setItem = (item) => {
      this.item = item;
    }
    if(this.$stateParams.id) {
      this.API.doGet('items/' + this.$stateParams.id, setItem);
    }

    const setUoM = (data) => {
      this.measurements = data;
    };

    this.API.doGet('measurement-units', setUoM);

    var initialNum = this.itemType ? '0000' : '00';
    for (var i = 1; i <= 8; i++) {
      this.compNos.push(initialNum+i);
    };
    if(this.itemType) {
      this.categories.push(
        {
          label: 'BASIC ENGINE - CAMSHAFT',
          value: '001'
        },
        {
          label: 'BASIC ENGINE - CONNECTING ROD',
          value: '002'
        },
        {
          label: 'BASIC ENGINE - CRANKSHAFT',
          value: '003'
        },
        {
          label: 'BASIC ENGINE - ENGINE BLOCK',
          value: '004'
        },
        {
          label: 'BASIC ENGINE - CYLINDER HEAD',
          value: '005'
        }
      );
      this.brands.push(
        {
          label: 'CATERPILLAR',
          value: '01'
        },
        {
          label: 'CKD',
          value: '02'
        },
        {
          label: 'CUMMINS',
          value: '03'
        },
        {
          label: 'CUMMINS-STANFORD',
          value: '04'
        },
        {
          label: 'CUMPER',
          value: '05'
        }
      );
      this.capacities.push(
        {
          label: '6 KW (ENGINE CAPACITY)',
          value: '01'
        },
        {
          label: '12 KW (ENGINE CAPACITY)',
          value: '02'
        },
        {
          label: '15 KW (ENGINE CAPACITY)',
          value: '03'
        },
        {
          label: '20 KW (ENGINE CAPACITY)',
          value: '04'
        },
        {
          label: '22 KW (ENGINE CAPACITY)',
          value: '05'
        }
      );
    } else {
      this.categories.push(
        {
          label: 'Engine',
          value: '001'
        },
        {
          label: 'Turbine',
          value: '002'
        },
        {
          label: 'PV Panel',
          value: '003'
        },
        {
          label: 'Generator',
          value: '004'
        },
        {
          label: 'Plant Control Panel',
          value: '005'
        }
      );
      this.elecTypes.push(
        {
          label: 'Equipment',
          value: '1'
        },
        {
          label: 'Device',
          value: '2'
        },
        {
          label: 'Hardware',
          value: '3'
        },
        {
          label: 'Wires',
          value: '4'
        },
        {
          label: 'Poles',
          value: '5'
        },
        {
          label: 'Others',
          value: '6'
        }
      );
      this.facilities.push(
        {
          label: 'Plant',
          value: '01'
        },
        {
          label: 'Substation',
          value: '02'
        },
        {
          label: 'Lines',
          value: '03'
        }
      );
      this.facilityTypes.push(
        {
          label: 'Diesel',
          value: '01'
        },
        {
          label: 'Hydro',
          value: '02'
        },
        {
          label: 'Wind',
          value: '03'
        },
        {
          label: 'Solar',
          value: '04'
        },
        {
          label: 'Substation',
          value: '05'
        }
      );
      this.outVoltages.push(
        {
          label: '0V',
          value: '01'
        },
        {
          label: '240V',
          value: '02'
        },
        {
          label: '480V',
          value: '03'
        },
        {
          label: '4160V',
          value: '04'
        },
        {
          label: '13.8k V',
          value: '05'
        },
        {
          label: '69k V',
          value: '06'
        },
        {
          label: '138k V',
          value: '07'
        },
        {
          label: '230k V',
          value: '08'
        }
      );
    }
  }

  submit(item) {
    let state = this.$state;
    let itemCode = "";
    if(this.itemType) {
      item.code = itemCode.concat(
        item.mechanical,
        item.brandDd.value,
        item.capacityDd.value,
        item.mechanicalSpares,
        item.other,
        item.category.value,
        item.componentId
      );
      item.capacity = item.capacityDd.label;
      item.brand = item.brandDd.label;
    } else {
      item.code = itemCode.concat(
        item.electrical,
        item.facilityDd.value,
        item.facilityTypeDd.value,
        item.other,
        item.elecType.value,
        item.outVoltage.value,
        item.category.value,
        item.componentId
      );
      item.outputVoltage = item.outVoltage.label;
      item.facilityType = item.facilityTypeDd.label;
      item.facility = item.facilityDd.label;
      item.electricalType = item.elecType.label;
    }
    item.categoryId = item.category.label;
    this.API.doPost('items', item, function(resp) {
      state.go('item-list');
    },{});
  }
}

angular.module('spugApp')
  .component('item', {
    templateUrl: 'app/item/item.html',
    controller: ItemComponent,
    controllerAs: 'itemStock'
  });

})();
