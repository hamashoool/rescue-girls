from django.contrib import admin

from django.contrib.auth.admin import UserAdmin

from main_app.models import User, Contact, Alert


class UserAdminCustom(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_girl', 'is_superuser', 'is_savior',)
    list_filter = ('is_girl', 'is_superuser', 'is_savior',)
    search_fields = ('username', 'email',)

    UserAdmin.fieldsets += (
        ('Extra Fields', {
            'fields': ('is_girl', 'is_savior',)
        }),
    )


admin.site.register(User, UserAdminCustom)
admin.site.register(Contact)
admin.site.register(Alert)
