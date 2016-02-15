function data(){
	this.cashe = {};
	this.expando = "JQ" + Math.random();
	this.uid = 0;
};

data.accept = function(elem){
	if(elem.nodeType === 1 || elem.nodeType === 9) return true;
	return false;
}

data.prototype = {
	key : function(elem){
		//uid最好只能获取，不能修改
		if(!data.accept(elem)) return 0;
		if(!elem[this.expando]){
			this.uid++;
			try{
				Object.defineProperties(elem,this.expando,{value : this.uid})
			}catch(e){
				elem[this.expando] = this.uid;
			};
			return this.uid;
		};

		return elem[this.expando];

	},

	set : function(elem,key,value){
		var Iuid = this.key(elem),
			cashe = this.cashe[Iuid];
		if(!cashe){
			this.cashe[Iuid] = {};
			this.cashe[Iuid][key] = value;
		}else{
			cashe[key] = value;
		}
		
	},

	get : function(elem,key){
		var Iuid = this.key(elem);
		this.cashe[Iuid] = this.cashe[Iuid] || {};
		var	cashe = this.cashe[Iuid];
		
		if(key){
			return cashe[key];
		}else{
			return cashe;
		}
	}
};

var Gdata_user = new data();
var _dataUser = new data();

function Data(key,value){
	var j = this;
	var data = Gdata_user.get(j);
	if(!_dataUser.get(j,"hasAttrData")){
		var items = j.attributes;
		for(var i = 0; i < items.length; i++){
			var name = items[i].name;
			if(name.indexOf("data-") === 0){
				name = name.slice(5)
				getAttrDatas(j,name,data)
			}
		};
		_dataUser.set(j,"hasAttrData","true");
	}
	if(typeof key === "object"){
		for(var item in key){
			Gdata_user.set(j,item,key[item]);
		}
	}else if(!value){
		return Gdata_user.get(j,key)
	}else{
		Gdata_user.set(j,key,value);
	}
};

function getAttrDatas(elem,name,data){
	var attrName = "data-" + name;
	var value = elem.getAttribute(attrName);
	var Ivalue = value === "true" ? true :
	value === "false" ? false :
	value === "null" ? null : value;
	data[name] = value;
}