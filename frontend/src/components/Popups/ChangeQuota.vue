<template>
    <div class="changeQuota">
        <h2>Change Quota</h2>
        <FormKit type="form"
                 submit-label="Change Quota"
                 :submit-attrs="{ 'button-type': 'primary' }"
                 @submit="changeQuota">
            <FormKit type="number"
                     label="New Quota (leave blank for unlimited)"
                     v-model="newData.quota"
                     min="1" />
            <p>{{ response }}</p>
        </FormKit>
    </div>
</template>

<script>
import { useAccountStore } from "../../stores/account";
import { usePopups } from "../../stores/popups";

export default {
    props: ["data"],
    data() {
        return {
            account: useAccountStore(),
            popups: usePopups(),
            newData: {
                quota: "",
            },
            response: "",
        };
    },
    methods: {
        async changeQuota() {
            const verificationData = await this.popups.addPopup("Verify", { async: true });
            const loadingPopup = await this.popups.addPopup("Loader");

            const updatingSelf = this.data.account === this.account.account.id;

            const response = await this.account.fetch("/user/quota", {
                method: "PATCH",
                body: JSON.stringify({
                    user: {
                        quota: this.newData.quota,
                        userID: this.data.account,
                        account: this.account,
                    },
                    verification: verificationData,
                }),
            });

            this.popups.closePopup(loadingPopup.id);

            if (!response.success) {
                this.popups.addPopup("Information", {
                    title: `Error updating ${updatingSelf ? "your" : "their"} quota`,
                    description: response.message,
                    buttons: [
                        {
                            name: "Retry",
                            type: "primary",
                            action: "return",
                        },
                        {
                            name: "Cancel",
                            type: "secondary",
                            action: "close-all",
                        },
                    ],
                });
            } else {
                if (updatingSelf) this.account.account = response.result.account;

                this.popups.closeSelf(this, { account: response.result.account });
                if (this.account.preferences.reducedPopups) return;
                this.popups.addPopup("Information", {
                    title: `Successfully updated ${updatingSelf ? "your" : "their"} quota`,
                    buttons: [
                        {
                            name: "Okay",
                            type: "primary",
                            action: "close-all",
                        },
                    ],
                });
            }
        },
    },
};
</script>
