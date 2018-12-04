<template>
    <div class="HRUserFile-box">
        <JdHeader title="个人档案信息"></JdHeader>
        <van-tabs v-model="active" @click="tabClick">
            <van-tab v-for="item in tabOptions" :title="item.Title" :key="item.ID"></van-tab>
        </van-tabs>
        <!--基本资料-->
        <div v-if="active === 0">
            <van-cell>
                <van-row type="flex" justify="center">
                    <van-col>
                        <!--<img class="user-head" @click="imgClick('../../../static/images/user-head.png')" src="../../../static/images/user-head.png" alt="用户头像">-->
                        <img class="user-head" @click="imgClick(model.Photo)" :src="model.Photo" alt="用户头像">
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>部门</van-col>
                    <van-col>{{otherData.DepartName}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>岗位</van-col>
                    <van-col>{{model.PostName}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>姓名</van-col>
                    <van-col>{{model.FullName}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>性别</van-col>
                    <van-col>{{model.Sex}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>身份证号码</van-col>
                    <van-col>{{model.IdCardNumber}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>身份证有效时限</van-col>
                    <van-col>{{model.IdCardAbleDateStart}} ~ {{model.IdCardAbleDate}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>出生日期</van-col>
                    <van-col>{{model.BirthDay}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>民族</van-col>
                    <van-col>{{model.Nation}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>籍贯</van-col>
                    <van-col>{{model.NativePlace}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>户口所在地</van-col>
                    <van-col>{{model.DomicilePlace}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>政治面貌</van-col>
                    <van-col>{{model.PoliticsStatus}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>户口性质</van-col>
                    <van-col>{{model.Account}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>学历</van-col>
                    <van-col>{{model.EduBackGround}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>专业</van-col>
                    <van-col>{{model.Major}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>毕业院校</van-col>
                    <van-col>{{model.GraduateSchool}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>毕业日期</van-col>
                    <van-col>{{model.GraduateDate}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>婚姻状况</van-col>
                    <van-col>{{model.MaritalStatus}}</van-col>
                </van-row>
            </van-cell>
            <van-cell></van-cell>
        </div>
        <!--联系方式-->
        <div v-if="active === 1">
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>手机</van-col>
                    <van-col>{{model.Mobile}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>住址电话</van-col>
                    <van-col>{{model.HomePhone}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>电子邮件</van-col>
                    <van-col>{{model.Email}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>个人住址</van-col>
                    <van-col>{{model.HomeAddress}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>个人住址邮编</van-col>
                    <van-col>{{model.HomeZip}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>紧急联系人姓名</van-col>
                    <van-col>{{model.UrgentMan}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>紧急联系人电话</van-col>
                    <van-col>{{model.UrgentPhone}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>与紧急联系人关系</van-col>
                    <van-col>{{model.UrgentGuanXi}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>紧急联系人住址</van-col>
                    <van-col>{{model.UrgentAddress}}</van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex" justify="space-between">
                    <van-col>紧急联系人邮编</van-col>
                    <van-col>{{model.UrgentZipCode}}</van-col>
                </van-row>
            </van-cell>
            <van-cell></van-cell>
        </div>
        <!--社会关系-->
        <div v-if="active === 2">
            <div v-for="(item, index) in lstUserRelation" v-if="lstUserRelation.length">
                <div class="index-box">社会关系{{index + 1}}</div>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>姓名</van-col>
                        <van-col>{{item.RelationFullName}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>关系</van-col>
                        <van-col>{{item.Relation}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>出生日期</van-col>
                        <van-col>{{item.BirthDay}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>工作单位</van-col>
                        <van-col>{{item.WorkCompany}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>职务</van-col>
                        <van-col>{{item.Post}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>电话</van-col>
                        <van-col>{{item.Phone}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>备注</van-col>
                        <van-col>{{item.Remark}}</van-col>
                    </van-row>
                </van-cell>
                <div class="borderBox" v-if="lstUserRelation.length > 1 && index < lstUserRelation.length - 1"></div>
            </div>
            <div class="empty" v-if="!lstUserRelation.length">暂无数据</div>
        </div>
        <!--学习经历-->
        <div v-if="active === 3">
            <div v-for="(item, index) in lstUserStudyHistory" v-if="lstUserStudyHistory.length">
                <div class="index-box">学习经历{{index + 1}}</div>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>学校名称</van-col>
                        <van-col>{{item.SchoolName}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>专业</van-col>
                        <van-col>{{item.Major}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>开始时间</van-col>
                        <van-col>{{item.StartDate}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>结束时间</van-col>
                        <van-col>{{item.EndDate}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>学历</van-col>
                        <van-col>{{item.Education}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>学位</van-col>
                        <van-col>{{item.Gegree}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>证书编号</van-col>
                        <van-col>{{item.Certificate}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>备注</van-col>
                        <van-col>{{item.Remark}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell v-if="lstUserStudyHistory.length === 1"></van-cell>
                <div class="borderBox" v-if="lstUserStudyHistory.length > 1 && index < lstUserStudyHistory.length - 1"></div>
            </div>
            <div class="empty" v-if="!lstUserStudyHistory.length">暂无数据</div>
        </div>
        <!--工作经历-->
        <div v-if="active === 4">
            <div v-for="(item, index) in lstUserJobHistory" v-if="lstUserJobHistory.length">
                <div class="index-box">工作经历{{index + 1}}</div>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>单位名称</van-col>
                        <van-col>{{item.CompanyName}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>任职时间</van-col>
                        <van-col>{{item.StartDate}} ~ {{item.EndDate}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>职务</van-col>
                        <van-col>{{item.Post}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>工资</van-col>
                        <van-col>{{item.Salary}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between" gutter="15">
                        <van-col span="4">工作内容描述</van-col>
                        <van-col span="20">{{item.JobContent}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between" gutter="15">
                        <van-col span="4">备注</van-col>
                        <van-col span="20">{{item.Remark}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell v-if="lstUserJobHistory.length === 1"></van-cell>
                <div class="borderBox" v-if="lstUserJobHistory.length > 1 && index < lstUserJobHistory.length - 1"></div>
            </div>
            <div class="empty" v-if="!lstUserJobHistory.length">暂无数据</div>
        </div>
        <!--资质记录-->
        <div v-if="active === 5">
            <div v-for="(item, index) in lstUserQualifications" v-if="lstUserQualifications.length">
                <div class="index-box">资质记录{{index + 1}}</div>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>资质名称</van-col>
                        <van-col>{{item.Qualification}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>发放日期</van-col>
                        <van-col>{{item.GetDateTime}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>到期日期</van-col>
                        <van-col>{{item.ExpireDateTime}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>证书号</van-col>
                        <van-col>{{item.QualificationNumber}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell v-if="lstUserQualifications.length === 1"></van-cell>
                <div class="borderBox" v-if="lstUserJobHistory.length > 1 && index < lstUserJobHistory.length - 1"></div>
            </div>
            <div class="empty" v-if="!lstUserQualifications.length">暂无数据</div>
        </div>
        <!--职称记录-->
        <div v-if="active === 6">
            <div v-for="(item, index) in lstUserTile" v-if="lstUserTile.length">
                <div class="index-box">职称记录{{index + 1}}</div>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>职称名称</van-col>
                        <van-col>{{item.CompanyName}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>职称专业</van-col>
                        <van-col>{{item.StartDate}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>发放日期</van-col>
                        <van-col>{{item.Post}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>认定日期</van-col>
                        <van-col>{{item.Salary}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell>
                    <van-row type="flex" justify="space-between">
                        <van-col>证书号</van-col>
                        <van-col>{{item.JobContent}}</van-col>
                    </van-row>
                </van-cell>
                <van-cell v-if="lstUserTile.length === 1"></van-cell>
                <div class="borderBox" v-if="lstUserTile.length > 1 && index < lstUserTile.length - 1"></div>
            </div>
            <div class="empty" v-if="!lstUserTile.length">暂无数据</div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import header from '../../components/common/header';
    import MUtil from '../../util/mm';
    import { ImagePreview } from 'vant';

    const _mm = new MUtil();

    export default {
        name: 'HRUserFile',
        data () {
            return {
                active: 0,
                model: {}, // 基本资料 + 联系方式
                otherData: {}, // 其他信息
                lstUserRelation: [], // 社会关系
                lstUserStudyHistory: [], // 学习经历
                lstUserJobHistory: [], // 工作经历
                lstUserQualifications: [], // 资质记录
                lstUserTile: [], // 职称记录
                tabOptions: [
                    {
                        ID: 0,
                        Title: '基本资料'
                    },
                    {
                        ID: 1,
                        Title: '联系方式'
                    },
                    {
                        ID: 2,
                        Title: '社会关系'
                    },
                    {
                        ID: 3,
                        Title: '学习经历'
                    },
                    {
                        ID: 4,
                        Title: '工作经历'
                    },
                    {
                        ID: 5,
                        Title: '资质记录'
                    },
                    {
                        ID: 6,
                        Title: '职称记录'
                    }
                ]
            }
        },
        computed: {
            ...mapGetters([
            ]),
        },
        components: {
            [header.name]: header,
        },
        methods: {
            ...mapActions([
                'GetHRUserFilePersonal'
            ]),
            tabClick(val) {
            },
            imgClick(val) {
                ImagePreview({
                    images: [val]
                });
            }
        },
        mounted() {
            this.GetHRUserFilePersonal().then((res) => {
                // 基本资料 + 联系方式
                this.model = Object.assign({}, res.model, {
                    IdCardAbleDateStart: _mm.formatDate(new Date(res.model.IdCardAbleDateStart)),
                    IdCardAbleDate: _mm.formatDate(new Date(res.model.IdCardAbleDate)),
                    BirthDay: _mm.formatDate(new Date(res.model.BirthDay)),
                    GraduateDate: _mm.formatDate(new Date(res.model.GraduateDate)),
                });
                // 其他信息
                this.otherData = res.otherData;
                // 社会关系
                this.lstUserRelation = res.lstUserRelation.map((item) => {
                    return Object.assign({}, item, {
                        BirthDay: _mm.formatDate(new Date(item.BirthDay)),
                    });
                });
                // 学习经历
                this.lstUserStudyHistory = res.lstUserStudyHistory.map((item) => {
                    return Object.assign({}, item, {
                        StartDate: _mm.formatDate(new Date(item.StartDate)),
                        EndDate: _mm.formatDate(new Date(item.EndDate)),
                    });
                });
                // 工作经历
                this.lstUserJobHistory = res.lstUserJobHistory.map((item) => {
                    return Object.assign({}, item, {
                        StartDate: _mm.formatDate(new Date(item.StartDate)),
                        EndDate: _mm.formatDate(new Date(item.EndDate)),
                        Salary: _mm.formatMoney(item.Salary)
                    });
                });
                // 资质记录
                this.lstUserQualifications = res.lstUserQualifications.map((item) => {
                    return Object.assign({}, item, {
                        GetDateTime: _mm.formatDate(new Date(item.GetDateTime)),
                        ExpireDateTime: _mm.formatDate(new Date(item.ExpireDateTime)),
                    });
                });
                // 职称记录
                this.lstUserTile = res.lstUserTile.map((item) => {
                    return Object.assign({}, item, {
                        GetDateTime: _mm.formatDate(new Date(item.GetDateTime)),
                        CognizanceDateTime: _mm.formatDate(new Date(item.CognizanceDateTime)),
                    });
                });
            });
        }
    }
</script>

<style lang="less" scoped>
    @import "../../style/common/common";
    @import "../../style/pages/HRUserFile/HRUserFileList";
</style>
