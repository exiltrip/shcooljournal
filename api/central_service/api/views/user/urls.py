from api.views.user.views import (GetUserInfo, MyTokenObtainPairView,
                                  RegisterUserView)
from django.urls import include, path
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path(
        'login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'
    ),
    path(
        'register/', RegisterUserView.as_view(), name='register__user'
    ),
    path(
        'jwttoken/refresh/', TokenRefreshView.as_view(), name='token_refresh'
    ),
    path(
        'password-reset/',
        include('django_rest_passwordreset.urls', namespace='password_reset'),
    ),
    path(
        "get/<str:uuid>", GetUserInfo.as_view({'get': 'retrieve'}), name="get_user_info"
    ),
    path(
        "teacher", GetUserInfo.as_view({'get': 'teacher'}), name="get_teachers"
    ),
]
