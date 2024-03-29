from django.urls import path, include
from allauth.account.views import confirm_email
from django.conf.urls import url


urlpatterns = [
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^account/', include('allauth.urls')),
    url(r'^account/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email')
 
]
