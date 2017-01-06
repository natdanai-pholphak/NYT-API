var app = angular.module('MyApp', []);

app.service('Api', function($http) {
	this.getArticle = function(section, period) {
		return $http({
			method: 'GET',
			url: 'https://api.nytimes.com/svc/mostpopular/v2/mostviewed/' + section + '/' + period + '.json',
			params: {
				'api-key': 'a4e3b55538184153855392efa485a1b5'
			}
		});
	}
});

app.controller('ArticleListController', ['Api', function(Api) {
	$('#detail').hide();
	$('#myModal').modal('show');

	var ctrl = this;
	ctrl.sections = [
		'all-sections',
		'Arts',
		'Automobiles',
		'Blogs',
		'Books',
		'Business Day',
		'Education',
		'Fashion & Style',
		'Food',
		'Health',
		'Job Market',
		'Magazine',
		'membercenter',
		'Movies',
		'Multimedia',
		'NYT Now',
		'Obituaries',
		'Open',
		'Opinion',
		'Public Editor',
		'Real Estate',
		'Science',
		'Sports',
		'Style',
		'Sunday Reviews',
		'T Magazine',
		'Technology',
		'The Upshot',
		'Theater',
		'Time Insiders',
		"Today's Paper",
		'Travel',
		'U.S.',
		'World',
		'Your Money'
	];

	ctrl.section = "all-sections";
	ctrl.period = "1";
	ctrl.serach = "";
	ctrl.articles = [];
	ctrl.article = {};
	ctrl.error = "";

	ctrl.selectImage = function(media, type) {
		for (var i=0; i<media.length; i++) {
			if (media[i].format == type) {
				return media[i].url;
			}
		}
	}
	
	ctrl.reloadArticle = function() {
		$('#myModal').modal('show');
		ctrl.error = "";
		Api.getArticle(ctrl.section, ctrl.period).then(function(res) {
			ctrl.articles = res.data.results;
			$('#myModal').modal('hide');
		}).catch(function(err){
			ctrl.error = "Cannot load data from New York Times API.";
		});
	}

	ctrl.show = function(index) {
		ctrl.article = ctrl.articles[index];
		$('#list').hide();
		$('#detail').fadeIn('slow');
	}

	ctrl.back = function() {
		$('#detail').hide();
		$('#list').fadeIn('slow');
	}

	Api.getArticle(ctrl.section, ctrl.period).then(function(res) {
		ctrl.articles = res.data.results;
		$('#myModal').modal('hide');
	}).catch(function(err){
		ctrl.error = "Cannot load articles from NYT Api.";
	});

}]);