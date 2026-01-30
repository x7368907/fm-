import {
  Form,
  Button,
  Select,
  DatePicker,
  Input,
  Space,
  Typography,
} from 'antd'
import { CloseOutlined, SaveOutlined } from '@ant-design/icons'
import RichTextEditor from '../../../../components/RichTextEditor' // 請確認路徑

// 引入拆分的模組
import { useAnnounceForm } from '../hook/useAnnounceForm'
import type { TabType } from '../types'
import BannerSettings from './components/BannerSettings'
import RankSettings from './components/RankSettings'
import LossReportSettings from './components/LossReportSettings'
import SignInSettings from './components/SignInSettings'

const { Title } = Typography
const { RangePicker } = DatePicker

const colors = {
  purple: '#8B5CF6',
  grayText: '#666',
  grayBorder: '#d9d9d9',
  red: '#FF4d4F',
  green: '#52C41A',
}
const langs = ['繁', '簡', '英', '泰', '越']

interface AnnounceCreateProps {
  onCancel: () => void
  onSave: () => void
  initialValues?: any
  defaultTab?: TabType
}

export default function AnnounceCreate({
  onCancel,
  onSave,
  initialValues,
  defaultTab = 'activity',
}: AnnounceCreateProps) {
  const {
    form,
    activityType,
    category,
    activeTab,
    setActiveTab,

    // Banner
    bannerType,
    setBannerType,
    bannerImages,
    handleImageUpload,
    handleRemoveImage,

    // Languages
    currentNameLang,
    setCurrentNameLang,
    currentContentLang,
    setCurrentContentLang,
    titles,
    setTitles,
    contents,
    setContents,

    // Settings
    rankRows,
    addRankRow,
    removeRankRow,
    settlementType,
    setSettlementType,
    lossReportRows,
    addLossRow,
    removeLossRow,
    lossResetType,
    setLossResetType,

    // Submit
    submit,
  } = useAnnounceForm(initialValues, defaultTab, onSave)

  const isSimplifiedMode = activeTab === 'system' || activeTab === 'game'
  const showRankSettings =
    !isSimplifiedMode && activityType === '系統機制' && category === '排行活動'

  const showSignInSettings =
    !isSimplifiedMode && activityType === '系統機制' && category === '簽到活動'

  const showLossReportSettings =
    !isSimplifiedMode &&
    activityType === '系統機制' &&
    category === '贏分金額加贈金活動'

  const LABEL_WIDTH = '110px'

  const labelStyle = {
    width: LABEL_WIDTH,
    minWidth: LABEL_WIDTH,
    textAlign: 'left' as const,
    fontWeight: 500,
    color: '#333',
    paddingTop: 4,
    marginRight: 16,
  }

  const getLangButtonStyle = (lang: string, currentLang: string) => ({
    border: `1px solid ${
      lang === currentLang ? colors.purple : colors.grayBorder
    }`,
    backgroundColor: lang === currentLang ? '#F3E8FF' : '#fff',
    color: lang === currentLang ? colors.purple : colors.grayText,
    fontWeight: lang === currentLang ? 'bold' : 'normal',
  })

  const getCategoryOptions = () => {
    if (activityType === '系統機制') {
      return [
        { label: '簽到活動', value: '簽到活動' },
        { label: '排行活動', value: '排行活動' },
        { label: '贏分金額加贈金活動', value: '贏分金額加贈金活動' },
        { label: '儲值活動', value: '儲值活動' },
      ]
    }
    return [
      { label: '儲值禮', value: '儲值禮' },
      { label: '註冊禮', value: '註冊禮' },
      { label: 'VIP禮包', value: 'VIP禮包' },
      { label: '救援金', value: '救援金' },
    ]
  }

  return (
    <div className="space-y-4 bg-gray-50 p-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500">
        營運管理 &gt; 公告管理 &gt;{' '}
        <span className="font-bold text-gray-800">
          {initialValues ? '編輯公告' : '新增公告'}
        </span>
      </div>

      {/* ===== 外層卡片（sticky 以這層為基準） ===== */}
      <div className="relative rounded-lg bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <Title level={4} style={{ marginBottom: 0 }}>
            {initialValues ? '編輯公告' : '新增公告'}
          </Title>
        </div>

        {/* ===== 內容區（預留 footer 高度） ===== */}
        <div className="p-6 pb-32">
          {/* Tabs */}
          <div className="mb-6">
            <div className="mb-4 font-bold text-gray-700">活動公告設定</div>
            <Space size={16}>
              {[
                { key: 'activity', label: '活動' },
                { key: 'system', label: '系統' },
                { key: 'game', label: '遊戲' },
              ].map((item) => (
                <Button
                  key={item.key}
                  onClick={() => setActiveTab(item.key as TabType)}
                  type={activeTab === item.key ? 'primary' : 'default'}
                  className="w-24"
                >
                  {item.label}
                </Button>
              ))}
            </Space>
          </div>

          <Form
            form={form}
            layout="horizontal"
            labelCol={{ flex: LABEL_WIDTH }}
            wrapperCol={{ flex: 1 }}
            labelAlign="left"
          >
            {!isSimplifiedMode && (
              <>
                <Form.Item label="活動類型" name="activityType">
                  <Select
                    style={{ maxWidth: 400 }}
                    onChange={() => form.setFieldsValue({ category: null })}
                  >
                    <Select.Option value="人工審核">人工審核</Select.Option>
                    <Select.Option value="系統機制">系統機制</Select.Option>
                    <Select.Option value="自動派發">自動派發</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="活動類別" name="category">
                  <Select
                    style={{ maxWidth: 400 }}
                    options={getCategoryOptions()}
                    placeholder="請選擇"
                  />
                </Form.Item>

                <Form.Item label="活動種類" name="type">
                  <Select style={{ maxWidth: 400 }}>
                    <Select.Option value="儲值禮">儲值禮</Select.Option>
                    <Select.Option value="紅利贈送">紅利贈送</Select.Option>
                    <Select.Option value="實體獎品">實體獎品</Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}

            {/* 活動公告名稱 */}
            <div className="mb-6 flex">
              <div style={labelStyle}>活動公告名稱</div>
              <div className="max-w-[600px] flex-1">
                <div className="mb-2 flex gap-2">
                  {langs.map((lang) => (
                    <div
                      key={lang}
                      onClick={() => setCurrentNameLang(lang)}
                      className="cursor-pointer rounded px-3 py-1 text-sm transition-all"
                      style={getLangButtonStyle(lang, currentNameLang)}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
                <Input
                  placeholder={`請輸入${currentNameLang}體公告名稱`}
                  value={titles[currentNameLang]}
                  onChange={(e) =>
                    setTitles((p) => ({
                      ...p,
                      [currentNameLang]: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <Form.Item label="公告時間" name="announceTime">
              <DatePicker style={{ maxWidth: 510, width: '100%' }} />
            </Form.Item>

            <Form.Item label="活動期限" name="activityRange">
              <RangePicker style={{ maxWidth: 510, width: '100%' }} />
            </Form.Item>

            {!isSimplifiedMode && (
              <Form.Item label="活動排序" name="sort">
                <Input type="number" style={{ maxWidth: 510 }} />
              </Form.Item>
            )}

            {/* 活動內文 */}
            <div className="mb-6 flex">
              <div style={labelStyle}>活動內文</div>
              <div className="max-w-[900px] flex-1">
                <div className="mb-2 flex gap-2">
                  {langs.map((lang) => (
                    <div
                      key={lang}
                      onClick={() => setCurrentContentLang(lang)}
                      className="cursor-pointer rounded px-3 py-1 text-sm transition-all"
                      style={getLangButtonStyle(lang, currentContentLang)}
                    >
                      {lang}
                    </div>
                  ))}
                </div>
                <RichTextEditor
                  value={contents[currentContentLang]}
                  onChange={(html) =>
                    setContents((p) => ({
                      ...p,
                      [currentContentLang]: html,
                    }))
                  }
                  height={350}
                />
              </div>
            </div>

            {showRankSettings && (
              <RankSettings
                rankRows={rankRows}
                addRankRow={addRankRow}
                removeRankRow={removeRankRow}
                settlementType={settlementType}
                setSettlementType={setSettlementType}
              />
            )}

            {showLossReportSettings && (
              <LossReportSettings
                lossReportRows={lossReportRows}
                addLossRow={addLossRow}
                removeLossRow={removeLossRow}
                lossResetType={lossResetType}
                setLossResetType={setLossResetType}
              />
            )}

            {showSignInSettings && <SignInSettings />}

            {!isSimplifiedMode && (
              <BannerSettings
                bannerType={bannerType}
                setBannerType={setBannerType}
                bannerImages={bannerImages}
                onUpload={handleImageUpload}
                onRemove={handleRemoveImage}
              />
            )}
          </Form>
        </div>

        {/* ===== Sticky Footer（統一標準） ===== */}
        <div className="sticky bottom-0 z-10 flex justify-center gap-4 border-t border-gray-200 bg-white py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Button
            icon={<CloseOutlined />}
            size="large"
            onClick={onCancel}
            className="h-10 w-32 border-red-500 font-bold text-red-500 hover:!border-red-400 hover:!text-red-400"
          >
            取消
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            size="large"
            onClick={submit}
            className="h-10 w-32 border-green-500 bg-green-500 font-bold hover:!bg-green-400"
          >
            儲存
          </Button>
        </div>
      </div>
    </div>
  )
}
